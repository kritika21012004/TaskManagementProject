import jwt
import bcrypt
import falcon
import json
from database.dao.tasks import TaskDatabase
from database.dao.users import UserDatabase
from bson import ObjectId
from json import JSONEncoder as _JSONEncoder, dumps
from datetime import datetime
from ..common_resource.common  import MyJSONEncoder



class UserProfileResource:
    def __init__(self):
        self.user_db = UserDatabase()  # Create instance of UserDatabase
        self.task_db = TaskDatabase()
    def on_get(self, req, resp):
        email = req.get_param('email')
        user = self.user_db.find_user(email)
        if not user:
            raise falcon.HTTPNotFound()
        resp.media = dumps(user, cls=MyJSONEncoder)
