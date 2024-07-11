import jwt
import bcrypt
import falcon
import json
from database.dao.users import UserDatabase
from bson import ObjectId
from json import JSONEncoder as _JSONEncoder, dumps
from datetime import datetime
from ..common_resource.common  import MyJSONEncoder

# class UsersCollection:
#     def __init__(self):
#         self.user_db = UserDatabase()
#     def on_get(self, req, resp):
#         users = self.user_db.get_users()
#         resp.body = dumps(users, cls=MyJSONEncoder)
#         resp.status = falcon.HTTP_200



class UsersCollection:
    def __init__(self):
        self.user_db = UserDatabase()

    def on_get(self, req, resp):
        try:
            users = self.user_db.get_users()
            if not users:
                users = []  # return an empty list when no users are found

            # Exclude the 'password' field
            for user in users:
                user.pop('password', None)

            resp.body = dumps(users, cls=MyJSONEncoder)
            resp.status = falcon.HTTP_200
        except Exception as e:
            resp.status = falcon.HTTP_500
            resp.body = json.dumps({'error': str(e)})