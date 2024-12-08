import unittest
from unittest.mock import Mock, patch,call
from bson import ObjectId
from falcon import testing
import falcon
import json
from datetime import datetime
from resources.users_resource.single_userresource import SingleUserResource

class TestSingleUserResource(unittest.TestCase):
    def setUp(self):
        self.user_db = Mock()
        self.user_resc = SingleUserResource()
        self.user_resc.user_db = self.user_db
        self.req = Mock(spec=falcon.Request)
        self.resp = Mock(spec=falcon.Response)
        self.user_id = 'random_id'

    @patch('resources.users_resource.single_userresource.ObjectId', return_value='valid_object_id')
    def test_on_get(self, MockedObjectId):
        user_db_response = {'id': 'valid_object_id', 'name': 'test-name'}
        self.user_db.get_user.return_value = user_db_response

        self.user_resc.on_get(self.req, self.resp, self.user_id)

        self.assertEqual(self.resp.status, falcon.HTTP_200)
        expected_body = json.dumps(user_db_response)
        self.assertEqual(self.resp.body, expected_body)

    @patch('resources.users_resource.single_userresource.ObjectId', return_value='valid_object_id')
    def test_on_put(self, MockedObjectId):
        user_db_response = {'success': True}
        self.user_db.update_user.return_value = user_db_response
        self.req.media = {'name': 'test-name'}  # Updating the user's name

        self.user_resc.on_put(self.req, self.resp, self.user_id)

        self.assertEqual(self.resp.media, {'message': 'User updated successfully'})

    @patch('resources.users_resource.single_userresource.ObjectId', return_value='valid_object_id')
    def test_on_delete(self, MockedObjectId):
        user_db_response = {'success': True}
        self.user_db.update_user.return_value = user_db_response

        self.user_resc.on_delete(self.req, self.resp, self.user_id)

        self.assertEqual(self.resp.media, {'message': 'User deleted successfully'})

    @patch('resources.users_resource.single_userresource.ObjectId', return_value='valid_object_id')
    def test_on_put_with_task(self, MockedObjectId):
        user_db_response = {'success': True}
        self.user_db.get_user.return_value = {'tasks': []}
        self.req.media = {'assigned_task_id': 'task_id'}

        self.user_resc.on_put(self.req, self.resp, self.user_id)

        # Check if task is added to user record
        expected_calls = [call('valid_object_id', self.req.media), 
                          call('valid_object_id', {'tasks': ['task_id']})]

        self.user_db.update_user.assert_has_calls(expected_calls, any_order=False)
        self.assertEqual(self.resp.status, falcon.HTTP_200)
        self.assertEqual(self.resp.media, {'message': 'User updated successfully'})

if __name__ == '__main__':
    unittest.main()