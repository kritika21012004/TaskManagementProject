import unittest
from unittest.mock import Mock, patch
from falcon import testing
import falcon
import json
from resources.users_resource.user_login import UserLoginResource


class TestUserLoginResource(unittest.TestCase):
    def setUp(self):
        self.user_db = Mock()
        self.login_resc = UserLoginResource()
        self.login_resc.user_db = self.user_db
        self.req = Mock(spec=falcon.Request)
        self.resp = Mock(spec=falcon.Response)
    
    @patch('resources.users_resource.user_login.bcrypt.checkpw', return_value=True)
    @patch('resources.users_resource.user_login.jwt.encode', return_value='fake_token')
    def test_on_post_success(self, mock_jwt, mock_bcrypt):
        self.user_db.find_user.return_value = {
            '_id': 'testid',
            'email': 'testemail@example.com',
            'password': 'hashedpassword',
            'name': 'Test User'
        }
        self.req.media = {'email': 'testemail@example.com', 'password': 'testpassword'}
        self.login_resc.on_post(self.req, self.resp)
        self.assertEqual(self.resp.status, falcon.HTTP_200)
        self.assertEqual(json.loads(self.resp.body), {'message': 'Login Successfully', 'success': True, 'token': 'fake_token', 'name': 'Test User'})

    @patch('resources.users_resource.user_login.bcrypt.checkpw', return_value=False)
    def test_on_post_failure_wrong_password(self, mock_bcrypt):
        self.user_db.find_user.return_value = {
            '_id': 'testid',
            'email': 'testemail@example.com',
            'password': 'hashedpassword',
            'name': 'Test User'
        }
        self.req.media = {'email': 'testemail@example.com', 'password': 'wrongpassword'}
        self.login_resc.on_post(self.req, self.resp)
        self.assertEqual(self.resp.status, falcon.HTTP_400)
        self.assertEqual(json.loads(self.resp.body), {'message': 'Invalid email or password'})

    def test_on_post_failure_nonexistent_user(self):
        self.user_db.find_user.return_value = None
        self.req.media = {'email': 'nonexistentuser@example.com', 'password': 'testpassword'}
        self.login_resc.on_post(self.req, self.resp)
        self.assertEqual(self.resp.status, falcon.HTTP_400)
        self.assertEqual(json.loads(self.resp.body), {'message': 'Invalid email or password'})

if __name__ == '__main__':
    unittest.main()