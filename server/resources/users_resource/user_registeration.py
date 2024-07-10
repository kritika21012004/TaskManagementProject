import jwt
import bcrypt
import falcon
import json
from database.dao.users import UserDatabase
from bson import ObjectId
from json import JSONEncoder as _JSONEncoder, dumps
from datetime import datetime


class UserRegistrationResource:
    def __init__(self):
        self.user_db = UserDatabase()  # Create instance of UserDatabase
        
    def on_post(self, req, resp):
        body = req.media
        email = body['email']
        user = self.user_db.find_user(email)
        if user:
            resp.status = falcon.HTTP_409
            resp.body = json.dumps(
                {'message': 'User already exists', 'success': False})
        else:
            password = body['password']
            if len(password) < 3:
                resp.status = falcon.HTTP_400
                resp.body = json.dumps(
                    {'message': 'Password should be at least 8 characters', 'success': False})
            else:
                hashed_password = bcrypt.hashpw(
                    password.encode('utf-8'), bcrypt.gensalt())
                user_info = {
                    'name': body['username'],
                    'email': body['email'],
                    'password': hashed_password.decode('utf-8'),
                    'role': body.get('role', 'user'),
                    'tasks': body.get('tasks', []),
                    'isActive': body.get('isActive', True),
                    'created_at': datetime.now(),
                    'updated_at': datetime.now(),
                    'deleted_at': None
                }
                self.user_db.insert_user(user_info)
                resp.status = falcon.HTTP_200
                resp.body = json.dumps(
                    {'message': 'User registered successfully', 'success': True})

