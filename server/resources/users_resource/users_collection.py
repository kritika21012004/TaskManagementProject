import jwt
import bcrypt
import falcon
import json
from database.dao.users import UserDatabase
from bson import ObjectId
from json import JSONEncoder as _JSONEncoder, dumps
from datetime import datetime
from ..common_resource.common  import MyJSONEncoder

class UsersCollection:
    def __init__(self):
        self.user_db = UserDatabase()
    def on_get(self, req, resp):
        users = self.user_db.get_users()
        resp.body = dumps(users, cls=MyJSONEncoder)
        resp.status = falcon.HTTP_200
