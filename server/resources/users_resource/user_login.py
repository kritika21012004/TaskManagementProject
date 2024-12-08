import jwt
import bcrypt
import falcon
import json
from database.dao.users import UserDatabase
from bson import ObjectId
from json import JSONEncoder as _JSONEncoder, dumps
from datetime import datetime
from ..common_resource.common  import MyJSONEncoder



class UserLoginResource:
    def __init__(self):
        self.user_db = UserDatabase()
        
    def on_post(self, req, resp):
        body = req.media
        email = body['email']
        user = self.user_db.find_user(email)



        if user and bcrypt.checkpw(body['password'].encode('utf-8'), user['password'].encode('utf-8')):
            token_data = {
                'id': str(user['_id']),
                'email': user['email'],
            }
            token = jwt.encode(token_data, 'SECRET', algorithm='HS256')
            resp.body = json.dumps({
                'token': token
            })
            resp.status = falcon.HTTP_200
            resp.body = json.dumps(
                {'message': 'Login Successfully', 'success': True, 'token': token, 'name': user['name']})
        else:
            resp.status = falcon.HTTP_400
            resp.body = json.dumps({'message': 'Invalid email or password'})
