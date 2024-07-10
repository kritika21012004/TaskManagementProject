# test_task_collection_resource.py

import falcon
from falcon import testing
import json
import pytest
from unittest.mock import MagicMock, ANY
from bson.objectid import ObjectId
from database.dao.tasks import TaskDatabase
from database.dao.users import UserDatabase
from resources.tasks.task_collection import TaskCollection

class TestTaskCollectionResource:
    def setup_method(self):
        self.mock_task_db = MagicMock(spec=TaskDatabase)
        self.mock_user_db = MagicMock(spec=UserDatabase)

        self.resource = TaskCollection()
        self.resource.task_db = self.mock_task_db
        self.resource.user_db = self.mock_user_db
        self.client = testing.TestClient(falcon.API())
        self.client.app.add_route('/test_route', self.resource)

    def test_on_get(self):
        tasks = [{
            '_id': ObjectId('507f1f77bcf86cd799439011'),
            'title': 'Task 1',
            'date': '2021-09-03T10:00:00',
            'priority': 'normal',
            'stage': 'todo',
            'activities': [],
            'assets': [],
            'team': []
        }]

        self.mock_task_db.get_tasks.return_value = tasks

        result = self.client.simulate_get('/test_route')
        expected_res = json.loads(json.dumps(tasks, default=str))

        assert result.json == expected_res
        assert result.status == falcon.HTTP_200

    def test_on_post(self):
        team_ids = ['507f1f77bcf86cd799439011']
        user = {'tasks': []}
        self.mock_user_db.get_user.return_value = user

        result = self.client.simulate_post(
            '/test_route',
            params={
                'title': 'New Task',
                'date': '2024-07-06',
                'team': team_ids,
                'stage': 'todo',
                'priority': 'normal',
            }
        )

        assert result.status == falcon.HTTP_200
        assert result.json == {'message': 'Task created successfully'}


    def test_on_get_no_tasks(self):
        self.mock_task_db.get_tasks.return_value = []

        result = self.client.simulate_get('/test_route')

        assert result.json == []
        assert result.status == falcon.HTTP_200



    def test_on_post_invalid_date_format(self):
        request_params_with_invalid_date = {
            'title': 'New Task',
            'date': 'invalid date string',
            'team': 'team_ids',
            'stage': 'todo',
            'priority': 'normal',
            'assets': 'asset1'
        }
        result = self.client.simulate_post('/test_route', params=request_params_with_invalid_date)
        assert result.status == falcon.HTTP_400
        assert result.json == {"error": "Invalid date format"}