# test_task_count_resource.py

import falcon
from falcon import testing
import pytest
from unittest.mock import MagicMock, ANY
from database.dao.tasks import TaskDatabase
from resources.tasks_resource.task_count_resource import TaskCountResource

class TestTaskCountResource:

    def setup_method(self):
        self.mock_db = MagicMock(spec=TaskDatabase)
        self.resource = TaskCountResource()
        self.resource.tasks_db = self.mock_db
        self.client = testing.TestClient(falcon.API())
        self.client.app.add_route('/test_route', self.resource)

    # Test the success case.
    def test_on_get(self):
        self.mock_db.get_tasks_count.return_value = 10
        self.mock_db.get_todo_tasks_count.return_value = 5
        self.mock_db.get_inprogress_tasks_count.return_value = 3
        self.mock_db.get_completed_tasks_count.return_value = 2

        result = self.client.simulate_get('/test_route')

        assert result.json == {
            'Total Tasks': 10,
            'Todo Tasks': 5,
            'In progress Tasks': 3,
            'Completed Tasks': 2
        }

    # Test When All Task Types are Zero.
    def test_no_tasks(self):
        self.mock_db.get_tasks_count.return_value = 0
        self.mock_db.get_todo_tasks_count.return_value = 0
        self.mock_db.get_inprogress_tasks_count.return_value = 0
        self.mock_db.get_completed_tasks_count.return_value = 0

        result = self.client.simulate_get('/test_route')

        assert result.json == {
            'Total Tasks': 0,
            'Todo Tasks': 0,
            'In progress Tasks': 0,
            'Completed Tasks': 0
        }

    # Test if Database call Throws an Error.
    def test_database_error(self):
        self.mock_db.get_tasks_count.side_effect = Exception("Database error")

        result = self.client.simulate_get('/test_route')

        assert result.status == falcon.HTTP_500
        assert result.json == {'title': '500 Internal Server Error'}

    # Test if any state count is higher than total count.
    def test_invalid_counts(self):
        self.mock_db.get_tasks_count.return_value = 10
        self.mock_db.get_todo_tasks_count.return_value = 20  # counts are inconsistent

        result = self.client.simulate_get('/test_route')

        assert result.status == falcon.HTTP_500
        
        assert result.json == {'title': '500 Internal Server Error'}
        self.mock_db.get_tasks_count.assert_called_with()
        self.mock_db.get_todo_tasks_count.assert_called_with()
        self.mock_db.get_inprogress_tasks_count.assert_not_called()
        self.mock_db.get_completed_tasks_count.assert_not_called()