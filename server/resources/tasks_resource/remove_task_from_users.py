from pymongo import MongoClient
from bson.objectid import ObjectId
from database.dao.users import UserDatabase

class UserTasks:
    def __init__(self):
        self.user_db = UserDatabase()

    def remove_task_from_all_users(self, task_title):
        users = self.user_db.get_users()
        for user in users:
            if "tasks" in user and task_title in user["tasks"]:
                 user["tasks"].remove(task_title)
                 self.user_db.update_user(ObjectId(user["_id"]), {'tasks': user["tasks"]})