import unittest
from unittest.mock import patch
from datetime import datetime
from bson.objectid import ObjectId
from mongomock import MongoClient

from server.database.dao import users
# import users  # update with your actual users module name.

# We'll use this mock database as a database stub.
mock_db = MongoClient().db

class TestUsers(unittest.TestCase):
    def setUp(self):
        self.user_info = {
            'email': 'test@example.com',
            '_id': ObjectId()
        }
        mock_db.users.insert_one(self.user_info)

    def test_find_user(self):
        with patch('users.users_in_db', new=mock_db.users):
            result = users.find_user('test@example.com')
        self.assertEqual(result, self.user_info)

    def test_insert_user(self):
        new_user = {'email': 'new@example.com'}
        with patch('users.users_in_db', new=mock_db.users):
            users.insert_user(new_user)
        result = mock_db.users.find_one(new_user)
        self.assertIsNotNone(result)
        self.assertIn('updated_at', result)

    def test_get_users(self):
        with patch('users.users_in_db', new=mock_db.users):
            result = users.get_users()
        self.assertEqual(len(result), 1)

    def test_get_user(self):
        with patch('users.users_in_db', new=mock_db.users):
            result = users.get_user(str(self.user_info['_id']))
        self.assertEqual(result, self.user_info)

    def test_update_user(self):
        new_values = {'email': 'updated@example.com'}
        with patch('users.users_in_db', new=mock_db.users):
            users.update_user(str(self.user_info['_id']), new_values)
        result = mock_db.users.find_one({'_id': self.user_info['_id']})
        self.assertEqual(result['email'], 'updated@example.com')

    def test_delete_user(self):
        with patch('users.users_in_db', new=mock_db.users):
            users.delete_user(str(self.user_info['_id']))
        result = mock_db.users.find_one({'_id': self.user_info['_id']})
        self.assertIn('deleted_at', result)

if __name__ == '__main__':
    unittest.main()