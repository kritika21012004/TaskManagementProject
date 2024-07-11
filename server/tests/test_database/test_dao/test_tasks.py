import unittest
from unittest.mock import patch, MagicMock
from bson.objectid import ObjectId
from datetime import datetime
from database.dao.tasks import TaskDatabase

class TestTaskDatabase(unittest.TestCase):

    def setUp(self):
        self.patcher1 = patch('database.db')
        self.patcher2 = patch('database.fs')

        self.mock_db = self.patcher1.start()
        self.mock_fs = self.patcher2.start()

        self.db = TaskDatabase()
        self.db.tasks_in_db = self.mock_db["tasks"]

    def tearDown(self):  # Stopping the mocks
        self.patcher1.stop()
        self.patcher2.stop()

    def test_insert_task(self):
        mock_task_info = {"title": "Test Task"}
        self.db.insert_task(mock_task_info)
        self.db.tasks_in_db.insert_one.assert_called_once()

    def test_get_tasks(self):
        self.db.get_tasks()
        self.db.tasks_in_db.find.assert_called_once()

    def test_get_task(self):
        task_id = ObjectId()  # New ObjectId
        self.db.get_task(task_id)
        self.db.tasks_in_db.find_one.assert_called_once_with({"_id": task_id})

    def test_update_task(self):
        task_id = ObjectId()  # New ObjectId
        new_values = {"title": "Updated task"}
        self.db.update_task(task_id, new_values)
        self.db.tasks_in_db.update_one.assert_called_once_with({"_id": task_id}, {"$set": new_values})

    def test_delete_task(self):
        task_id = ObjectId()  # New ObjectId
        self.db.delete_task(task_id)
        self.db.tasks_in_db.delete_one.assert_called_once_with({"_id": task_id})
