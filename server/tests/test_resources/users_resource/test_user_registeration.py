import jwt
import bcrypt
import falcon
import json
from unittest.mock import patch, Mock
from datetime import datetime

from falcon import testing
from resources.users_resource.user_registeration import UserRegistrationResource
from database.dao.users import UserDatabase

# User information for testing
from unittest.mock import patch
import bcrypt

# Users information for testing
user_info = {
    'username': 'test_username', 
    'email': 'test@example.com',
    'password': 'password123',  # No hashing here
    'role': 'user',
    'tasks': [],
    'isActive': True,
    'created_at': datetime.now().isoformat(),
    'updated_at': datetime.now().isoformat(),
    'deleted_at': None
}

class TestUserRegistrationResource:

    @classmethod
    def setup_class(cls):
        # setup falcon test client
        cls.api = application = falcon.API()
        cls.resource = UserRegistrationResource()
        application.add_route('/register', cls.resource)
        cls.client = testing.TestClient(application)
    
    @patch('bcrypt.hashpw')  # You use your function's actual path
    @patch.object(UserDatabase, 'find_user', return_value=user_info)
    @patch.object(UserDatabase, 'insert_user')
    def test_user_already_exists(self, mock_insert_user, mock_find_user, mock_hashpw):

        mock_hashpw.return_value = 'hashedpw'.encode('utf-8')  # Mocking the hashed password
        result = self.client.simulate_post('/register', json=user_info)

        assert result.status == falcon.HTTP_409
        assert result.json == {'message': 'User already exists', 'success': False}

    @patch('bcrypt.hashpw')  # You use your function's actual path
    @patch.object(UserDatabase, 'find_user', return_value=None)
    @patch.object(UserDatabase, 'insert_user')
    def test_password_too_short(self, mock_insert_user, mock_find_user, mock_hashpw):

        short_pass_user = user_info.copy()
        short_pass_user['password'] = '123'
        mock_hashpw.return_value = 'hashedpw'.encode('utf-8')  # Mocking the hashed password

        result = self.client.simulate_post('/register', json=short_pass_user)

        assert result.status == falcon.HTTP_400
        assert result.json == {'message': 'Password should be at least 8 characters', 'success': False}

    @patch('bcrypt.hashpw')  # You use your function's actual path
    @patch.object(UserDatabase, 'find_user', return_value=None)
    @patch.object(UserDatabase, 'insert_user', return_value=True)
    def test_registration_success(self, mock_insert_user, mock_find_user, mock_hashpw):

        mock_hashpw.return_value = b'hashedpassword'  # Mocking the hashed password as bytes

        user_info_copy = user_info.copy()
        user_info_copy['password'] = 'password12345678'  # Password with a length of 8 or more characters

        result = self.client.simulate_post('/register', json=user_info_copy)

        assert result.status == falcon.HTTP_200
        assert result.json == {'message': 'User registered successfully', 'success': True}