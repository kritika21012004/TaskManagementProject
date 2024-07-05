
import jwt
import bcrypt
import falcon
import json
from db import find_user, insert_user, update_user, delete_user, get_user, get_users,find_tasks_by_ids,find_tasks_by_titles
from bson import ObjectId
from json import JSONEncoder as _JSONEncoder, dumps
from datetime import datetime


class MyJSONEncoder(_JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        elif isinstance(o, datetime):
            return o.isoformat()
        return super().default(o)

class UsersCollection:

     def on_get(self, req, resp):
        users = get_users()
        for user in users:
            user["_id"] = str(user["_id"])
            tasks = find_tasks_by_titles(user["tasks"])
            user["tasks"] = [task["title"] for task in tasks]
        resp.body = dumps(users, cls=MyJSONEncoder)
        resp.status = falcon.HTTP_200


class SingleUserResource:

    def on_get(self, req, resp, id):
        user = get_user(ObjectId(id))
        resp.body = dumps(user, cls=MyJSONEncoder)
        resp.status = falcon.HTTP_200

    def on_put(self, req, resp, id):
        user_data = req.media
        user_data['updated_at'] = datetime.now()
        update_user(ObjectId(id), user_data)
        resp.media = {'message': 'User updated successfully'}

    def on_delete(self, req, resp, id):
        update_user(ObjectId(id), {'deleted_at': datetime.now()})
        resp.media = {'message': 'User deleted successfully'}


    def on_put(self, req, resp, id):
        body = req.media
        print(f"Updating user with id {id} and data {body}")  # Debug line
        result = update_user(ObjectId(id), body)
        print(f"Update operation result: {result}")  # Debug line
        if 'assigned_task_id' in body:
            task_id = body['assigned_task_id']
            print(f"Fetching user with id {id} for task assignment")  # Debug line
            user = get_user(ObjectId(id))
            if user:
                print(f"User fetched successfully: {user}")  # Debug line
                user_tasks = user.get('tasks', [])
                user_tasks.append(task_id)
                result = update_user(ObjectId(id), {'tasks': user_tasks})
                print(f"Task assignment operation result: {result}")  # Debug line
            else:
                print(f"No user found with id {id}")  # Debug line

        resp.status = falcon.HTTP_200
        resp.media = {'message': 'User updated successfully'}


class UserRegistrationResource:
    def on_post(self, req, resp):
        body = req.media
        email = body['email']
        user = find_user(email)
        if user:
            resp.status = falcon.HTTP_409
            resp.body = json.dumps({'message': 'User already exists', 'success': False})
        else:
            password = body['password']
            if len(password) < 3:
                resp.status = falcon.HTTP_400
                resp.body = json.dumps({'message': 'Password should be at least 8 characters', 'success': False})
            else:
                hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
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
                insert_user(user_info)
                resp.status = falcon.HTTP_200
                resp.body = json.dumps({'message': 'User registered successfully', 'success': True})


class UserLoginResource:
    def on_post(self, req, resp):
        body = req.media
        email = body['email']
        user = find_user(email)

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
            resp.body = json.dumps({'message': 'Login Successfully', 'success': True,'token':token ,'name':user['name']})
        else:
            resp.status = falcon.HTTP_400
            resp.body = json.dumps({'message': 'Invalid email or password'})


class LogoutResource:

  def on_get(self, req, resp):
    resp.status = falcon.HTTP_200
    resp.media = {'logout': 'Success'}

class UserProfileResource:
  auth = {
    'auth_disabled': False
  }
  def on_get(self, req, resp):
    print(req.get_param('email'))
    email = req.get_param('email')
    user = find_user(email)
    print(user)
    if not user:
      raise falcon.HTTPNotFound()
    resp.media = dumps(user, cls=MyJSONEncoder)


class ChangePasswordResource:
    def on_put(self, req, resp, id):
        body = req.media
        user = get_user(ObjectId(id))
        
        if bcrypt.checkpw(body['old_password'].encode('utf-8'), user['password'].encode('utf-8')):
            hashed_password = bcrypt.hashpw(body['new_password'].encode('utf-8'), bcrypt.gensalt())
            update_user(ObjectId(id), { 'password': hashed_password.decode('utf-8') })
            
            resp.status = falcon.HTTP_200
            resp.media = {'message': 'Password changed successfully', 'success': True}
        else:
            resp.status = falcon.HTTP_400
            resp.media = {'message': 'Incorrect old password', 'success': False}
