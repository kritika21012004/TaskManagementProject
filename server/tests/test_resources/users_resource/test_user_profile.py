import unittest
from unittest.mock import Mock, patch
from falcon import testing
import falcon
import json
from resources.users_resource.user_profile import UserProfileResource

class TestUserProfileResource(unittest.TestCase):
    def setUp(self):
        self.user_db = Mock()
        self.task_db = Mock()
        self.profile_resc = UserProfileResource()
        self.profile_resc.user_db = self.user_db
        self.profile_resc.task_db = self.task_db
        self.req = Mock()
        self.resp = Mock()

    def test_get_user_success(self):
        self.req.get_param.return_value = 'test@email.com'
        user_data = {
            '_id': 'testid',
            'email': 'testemail@example.com',
            'password': 'hashedpassword',
            'name': 'Test User'
        }
        self.user_db.find_user.return_value = user_data
        self.profile_resc.on_get(self.req, self.resp)
        self.assertEqual(self.resp.media, json.dumps(user_data))

    def test_get_user_not_found(self):
        self.req.get_param.return_value = 'non-existent@email.com'
        self.user_db.find_user.return_value = None
        with self.assertRaises(falcon.HTTPNotFound):
            self.profile_resc.on_get(self.req, self.resp)
        self.user_db.find_user.assert_called_with(self.req.get_param.return_value)

if __name__ == '__main__':
    unittest.main()