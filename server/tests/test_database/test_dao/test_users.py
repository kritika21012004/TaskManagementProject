import unittest
from unittest.mock import patch, MagicMock
from bson.objectid import ObjectId
from datetime import datetime
from database.dao.users import UserDatabase

class TestUserDatabase(unittest.TestCase):

    @patch("database.db")
    def setUp(self, mock_db):
        self.user_db = UserDatabase()
        self.user_db.users_in_db = MagicMock()

    def test_find_user(self):
        test_email = "test@example.com"
        self.user_db.find_user(test_email)
        self.user_db.users_in_db.find_one.assert_called_once_with({'email': test_email})

    def test_find_user_no_email(self):
        """Test find user when no email is given. (Edge Case)"""
        with self.assertRaises(TypeError):
            self.user_db.find_user()

    def test_insert_user(self):
        test_user_info = {"username": "test", "email": "test@example.com", "password": "test_password"}
        self.user_db.insert_user(test_user_info)
        self.user_db.users_in_db.insert_one.assert_called_once()

    def test_get_users(self):
        self.user_db.get_users()
        self.user_db.users_in_db.find.assert_called_once()

    def test_get_user(self):
        test_id = ObjectId()
        self.user_db.get_user(test_id)
        self.user_db.users_in_db.find_one.assert_called_with({"_id": test_id})
    def test_get_user_no_id(self):
        """Test get user when no id is given. (Edge Case)"""
        with self.assertRaises(TypeError):
            self.user_db.get_user()

    def test_update_user(self):
        test_user_id = ObjectId()
        new_values = {"username": "new_username"}
        self.user_db.update_user(test_user_id, new_values)
        self.user_db.users_in_db.update_one.assert_called_once_with({"_id": test_user_id}, {"$set": new_values})

    def test_update_user_no_id(self):
        """Test update user when no id is given. (Edge Case)"""
        new_values = {"username": "new_username"}
        with self.assertRaises(TypeError):
            self.user_db.update_user(new_values=new_values)


    def test_delete_user_no_id(self):
        """Test delete user when no id is given. (Edge Case)"""
        with self.assertRaises(TypeError):
            self.user_db.delete_user()
