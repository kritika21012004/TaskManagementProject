from datetime import datetime
from bson.objectid import ObjectId
from database import db


#create collection
users_in_db = db["users"]


def find_user(email):
    return users_in_db.find_one({'email': email})

def insert_user(user_info):
    user_info['updated_at'] = datetime.now()
    users_in_db.insert_one(user_info)
    
def get_users():
    return list(users_in_db.find())

def get_user(user_id):
    return users_in_db.find_one({"_id": ObjectId(user_id)})

def update_user(user_id, new_values):
    new_values['updated_at'] = datetime.now()
    users_in_db.update_one({"_id": ObjectId(user_id)}, {"$set": new_values})

def delete_user(user_id):
    users_in_db.update_one({"_id": ObjectId(user_id)}, {"$set": {'deleted_at': datetime.now()}})