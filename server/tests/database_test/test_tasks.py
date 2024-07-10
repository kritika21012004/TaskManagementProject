import unittest
from unittest.mock import patch
from datetime import datetime
from bson.objectid import ObjectId
from tasks import *

class TestTasks(unittest.TestCase):
    
    # executed prior to each test
    def setUp(self):
        self.task_id = ObjectId()
        self.task_info = {'_id': self.task_id, 'title': 'test', 'content': 'test content'}
        self.file_item = {'file': 'file_data', 'filename': 'filename', 'type': 'type'}
        self.task_ids = [self.task_id]
        self.titles = ['test']
        db.tasks_in_db.insert_one(self.task_info)

    # executed after each test
    def tearDown(self):
        db.tasks_in_db.delete_many({})


    def test_insert_task(self):
        new_task = {'title': 'new task', 'content': 'new task content'}
        insert_task(new_task)
        self.assertEqual(db.tasks_in_db.find_one(new_task) is not None)

    def test_get_tasks(self):
        tasks = get_tasks()
        self.assertEqual(len(list(tasks)), 1)

    def test_get_task(self):
        task = get_task(str(self.task_id))
        self.assertEqual(task, self.task_info)

    def test_update_task(self):
        new_values = {'title': 'updated title'}
        update_task(str(self.task_id), new_values)
        updated_task = get_task(str(self.task_id))
        self.assertEqual(updated_task['title'], 'updated title')

    def test_delete_task(self):
        delete_task(str(self.task_id))
        self.assertTrue(get_task(str(self.task_id)) is None)

    def test_find_tasks_by_ids(self):
        tasks = find_tasks_by_ids(self.task_ids)
        self.assertEqual(list(tasks), [self.task_info])

    def test_find_tasks_by_titles(self):
        tasks = find_tasks_by_titles(self.titles)
        self.assertEqual(list(tasks), [self.task_info])

    def test_insert_asset(self):
        asset_id = insert_asset(self.file_item)
        self.assertTrue(db.fs.get(asset_id) is not None)

    def test_get_asset(self):
        asset_id = db.fs.put('data')
        self.assertEqual(get_asset(str(asset_id)), 'data')

    def test_get_tasks_count(self):
        self.assertEqual(get_tasks_count(), 1)

# similarly, write tests for other function.

if __name__ == "__main__":
    unittest.main()
