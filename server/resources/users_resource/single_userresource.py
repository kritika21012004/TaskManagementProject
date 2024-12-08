import jwt
import bcrypt
import falcon
import json
# from database.dao.tasks import find_tasks_by_ids, find_tasks_by_titles
from bson import ObjectId
from json import JSONEncoder as _JSONEncoder, dumps
from datetime import datetime
from ..common_resource.common  import MyJSONEncoder
from database.dao.users import UserDatabase



class SingleUserResource:
    def __init__(self):
        self.user_db = UserDatabase() 

    def on_get(self, req, resp, id):
        user = self.user_db.get_user(ObjectId(id))
        resp.body = dumps(user, cls=MyJSONEncoder)
        resp.status = falcon.HTTP_200

    def on_put(self, req, resp, id):
        user_data = req.media
        user_data['updated_at'] = datetime.now()
        self.user_db.update_user(ObjectId(id), user_data)
        resp.media = {'message': 'User updated successfully'}

    def on_delete(self, req, resp, id):
        self.user_db.update_user(ObjectId(id), {'deleted_at': datetime.now()})
        resp.media = {'message': 'User deleted successfully'}

    def on_put(self, req, resp, id):
        body = req.media
        result = self.user_db.update_user(ObjectId(id), body)
        if 'assigned_task_id' in body:
            task_id = body['assigned_task_id']
            user = self.user_db.get_user(ObjectId(id))
            if user:
                user_tasks = user.get('tasks', [])
                user_tasks.append(task_id)
                result = self.user_db.update_user(ObjectId(id), {'tasks': user_tasks})
            else:
                print(f"No user found with id {id}")

        resp.status = falcon.HTTP_200
        resp.media = {'message': 'User updated successfully'}
