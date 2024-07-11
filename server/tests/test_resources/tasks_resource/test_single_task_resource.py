import falcon
from falcon import testing
import pytest
from unittest.mock import MagicMock
from bson.objectid import ObjectId
from database.dao.tasks import TaskDatabase
from database.dao.users import UserDatabase
from resources.tasks_resource.single_task_resource import SingleTaskResource

class TestSingleTaskResource:

    def setup_method(self):
        self.mock_task_db = MagicMock(spec=TaskDatabase)
        self.mock_user_db = MagicMock(spec=UserDatabase)

        self.resource = SingleTaskResource()
        self.resource.task_db = self.mock_task_db
        self.resource.user_db = self.mock_user_db

        self.client = testing.TestClient(falcon.API())
        self.client.app.add_route('/test_route/{id}', self.resource)

    def test_on_get(self):
        task_id = '507f1f77bcf86cd799439011'
        task_data = {
            'title': 'Existing Task',
            'date': '2021-09-03T10:00:00',
            'team': ['507f1f77bcf86cd799439011'],
            'stage': 'todo',
            'priority': 'normal',
            'assets': []            
        }

        self.mock_task_db.get_task.return_value = task_data

        result = self.client.simulate_get(f'/test_route/{task_id}')

        assert result.status == falcon.HTTP_200
        assert result.json == task_data

    def test_on_put(self):
        task_id = '507f1f77bcf86cd799439011'
        updated_title = 'Updated Task Title'

        self.mock_task_db.get_task.return_value = {'title': 'Old Title', 'assets': []}
        self.mock_user_db.get_user.return_value = {'tasks': []}

        result = self.client.simulate_put(
             f'/test_route/{task_id}',
             params={
                'title': updated_title,
                'date': '2021-09-03T10:00:00',
                'team': ['507f1f77bcf86cd799439011'],
                'stage': 'todo',
                'priority': 'normal'
              }
         )

        assert result.status == falcon.HTTP_200
        assert result.json == {"message": "Task Updated Successfully"}

    def test_on_delete(self):
        task_id = '507f1f77bcf86cd799439011'
        task_data = {
            'title': 'Existing Task',
            'date': '2021-09-03T10:00:00',
            'team': ['507f1f77bcf86cd799439011'],
            'stage': 'todo',
            'priority': 'normal',
            'assets': []            
        }

        self.mock_task_db.get_task.return_value = task_data
        self.mock_task_db.delete_task.return_value = True

        result = self.client.simulate_delete(f'/test_route/{task_id}')

        assert result.status == falcon.HTTP_200
        assert result.json == {"message": "Task deleted successfully"}