import unittest
from unittest import mock
from unittest.mock import MagicMock
from database.dao.users import UserDatabase
from resources.users_resource.users_collection import UsersCollection
import falcon
from bson import ObjectId
from falcon import testing
import jwt
import bcrypt


class MyTestCase(unittest.TestCase):
    def setUp(self):
        self.user_data = [{
            '_id': str(ObjectId()),
            'email': 'user@example.com',
            'password': bcrypt.hashpw('password1'.encode('utf-8'), bcrypt.gensalt())
        }]
        self.api = application = falcon.API()
        self.mocked_user_db = mock.create_autospec(UserDatabase)
        self.mocked_user_db.get_users.return_value = self.user_data
        users_collection = UsersCollection()
        users_collection.user_db = self.mocked_user_db
        self.api.add_route('/users', users_collection)
        self.client = testing.TestClient(self.api)

    def test_get_users(self):
        result = self.client.simulate_get('/users')
        self.assertEqual(result.status, falcon.HTTP_200)
        self.assertEqual(result.json, self.user_data)

    def test_get_users_empty(self):
        self.mocked_user_db.get_users.return_value = None  # get_users returns None
        result = self.client.simulate_get('/users')
        self.assertEqual(result.status, falcon.HTTP_200)
        self.assertEqual(result.json, [])  # Response should be an empty list

    def test_get_users_exception(self):
        self.mocked_user_db.get_users.side_effect = Exception('Database Error')
        result = self.client.simulate_get('/users')
        self.assertEqual(result.status, falcon.HTTP_500)
        self.assertIn('error', result.json)
        self.assertEqual(result.json.get('error'), 'Database Error')


if __name__ == '__main__':
    unittest.main()