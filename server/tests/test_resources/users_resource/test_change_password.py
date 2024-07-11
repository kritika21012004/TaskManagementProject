import unittest
from unittest.mock import Mock, patch
from falcon import testing
import falcon
import bcrypt
from resources.users_resource.change_password import ChangePasswordResource

class TestChangePasswordResource(unittest.TestCase):
    def setUp(self):
        self.user_db = Mock()
        self.change_password_resc = ChangePasswordResource()
        self.change_password_resc.user_db = self.user_db
        self.req = Mock(spec=falcon.Request)
        self.resp = Mock(spec=falcon.Response)
        self.user_id = 'random_id'

    @patch('resources.users_resource.change_password.ObjectId', return_value='valid_object_id')          
    @patch('bcrypt.gensalt')
    @patch('bcrypt.hashpw')
    @patch('bcrypt.checkpw')
    def test_on_put_success(self, MockedCheckpw, MockedHashpw, MockedGensalt, MockedObjectId):
        user_db_response = {'password': 'hashed-old-password'}
        self.user_db.get_user.return_value = user_db_response
        self.req.media = {'old_password': 'old-password', 'new_password': 'new-password'}

        MockedCheckpw.return_value=True
        MockedHashpw.return_value=b'hashed-new-password'

        self.change_password_resc.on_put(self.req, self.resp, self.user_id)

        self.assertEqual(self.resp.status, falcon.HTTP_200)
        self.assertEqual(self.resp.media, {'message': 'Password changed successfully', 'success': True})
        MockedCheckpw.assert_called_once_with('old-password'.encode('utf-8'), 'hashed-old-password'.encode('utf-8'))
        MockedHashpw.assert_called_once_with('new-password'.encode('utf-8'), MockedGensalt.return_value)
        self.user_db.update_user.assert_called_once_with('valid_object_id', {'password': 'hashed-new-password'})

    @patch('resources.users_resource.change_password.ObjectId', return_value='valid_object_id')          
    @patch('bcrypt.gensalt')
    @patch('bcrypt.hashpw')
    @patch('bcrypt.checkpw')
    def test_on_put_incorrect_old_password(self, MockedCheckpw, MockedHashpw, MockedGensalt, MockedObjectId):
        user_db_response = {'password': 'hashed-old-password'}
        self.user_db.get_user.return_value = user_db_response
        self.req.media = {'old_password': 'wrong-old-password', 'new_password': 'new-password'}

        MockedCheckpw.return_value=False
        MockedHashpw.return_value=b'hashed-new-password'

        self.change_password_resc.on_put(self.req, self.resp, self.user_id)

        self.assertEqual(self.resp.status, falcon.HTTP_400)
        self.assertEqual(self.resp.media, {'message': 'Incorrect old password', 'success': False})
        MockedCheckpw.assert_called_once_with('wrong-old-password'.encode('utf-8'), 'hashed-old-password'.encode('utf-8'))
        self.user_db.update_user.assert_not_called()


if __name__ == '__main__':
    unittest.main()