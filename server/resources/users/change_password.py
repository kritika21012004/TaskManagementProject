import jwt
import bcrypt
import falcon
import json
from bson import ObjectId
from json import JSONEncoder as _JSONEncoder, dumps
from datetime import datetime

# from  ..common_resource.common  import MyJSONEncoder
from database.dao.users import UserDatabase


class ChangePasswordResource(object):
    def __init__(self):
        self.user_db = UserDatabase()

    def on_put(self, req, resp, id):
        body = req.media
        user = self.user_db.get_user(ObjectId(id))
        if bcrypt.checkpw(body['old_password'].encode('utf-8'), user['password'].encode('utf-8')):
            hashed_password = bcrypt.hashpw(
                body['new_password'].encode('utf-8'), bcrypt.gensalt())
            self.user_db.update_user(ObjectId(id), {
                        'password': hashed_password.decode('utf-8')})

            resp.status = falcon.HTTP_200
            resp.media = {
                'message': 'Password changed successfully', 'success': True}
        else:
            resp.status = falcon.HTTP_400
            resp.media = {
                'message': 'Incorrect old password', 'success': False}
