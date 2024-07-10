from datetime import datetime
from bson.objectid import ObjectId
from database import db


class UserDatabase:
    
    def __init__(self):
        self.users_in_db = db["users"]

    def find_user(self, email):
        return self.users_in_db.find_one({'email': email})

    def insert_user(self, user_info):
        user_info['updated_at'] = datetime.now()
        self.users_in_db.insert_one(user_info)
    
    def get_users(self):
        return list(self.users_in_db.find())

    def get_user(self, user_id):
        return self.users_in_db.find_one({"_id": ObjectId(user_id)})

    def update_user(self, user_id, new_values):
        new_values['updated_at'] = datetime.now()
        self.users_in_db.update_one({"_id": ObjectId(user_id)}, {"$set": new_values})

    def delete_user(self, user_id):
        self.users_in_db.update_one({"_id": ObjectId(user_id)}, {"$set": {'deleted_at': datetime.now()}})