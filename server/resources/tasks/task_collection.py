# from falcon import HTTP_200
# from server.resources.common.common import MyJSONEncoder
# from database.tasks import insert_task, get_task
# from database.users import get_user, update_user
# import mimetypes
# from database.gridfile import fs
# from  common_resource.common  import MyJSONEncoder
# from json import JSONEncoder as _JSONEncoder, dumps
# from datetime import datetime
# from bson import json_util, ObjectId
# from pymongo import MongoClient
# from gridfs import GridFS


# class TaskCollection:

#     def make_task(values):
#         task = {
#             "title": values.get('title', ''),
#             "date": values.get('date', datetime.now()),
#             "priority": values.get('priority', 'normal'),
#             "stage": values.get('stage', 'todo'),
#             "activities": values.get('activities', []),
#             "assets": values.get('assets', []),
#             "team": values.get('team', []),
#             "createdAt": values.get('createdAt', datetime.now()),
#             "updatedAt": values.get('updatedAt', datetime.now()),
#             "deletedAt": values.get('deletedAt', None)
#         }
#         return task

#     def on_get(self, req, resp):
#         tasks = get_tasks()
#         for task in tasks:
#             task["_id"] = str(task["_id"])
#         resp.body = dumps(tasks, cls=MyJSONEncoder)
#         resp.status = falcon.HTTP_200

#     def on_post(self, req, resp):
#         team_ids = [id.strip() for id in req.get_param('team').split(',')]
#         task_data = {
#             'title': req.get_param('title'),
#             'date': req.get_param('date'),
#             'team': team_ids,
#             'stage': req.get_param('stage'),
#             'priority': req.get_param('priority')
#         }
#         assets = req.get_param('assets')
#         if assets is not None:
#             asset_ids = []
#             if not isinstance(assets, list):
#                 assets = [assets]
#             for asset in assets:
#                 data = asset.file.read()
#                 asset_id = fs.put(data, filename=asset.filename, content_type=mimetypes.guess_type(
#                     asset.filename)[0])
#                 asset_ids.append(str(asset_id))
#             task_data['assets'] = asset_ids
#         task = make_task(task_data)
#         task_id = insert_task(task)
#         for user_id in team_ids:
#             user = get_user(ObjectId(user_id))
#             user_tasks = user.get('tasks', [])
#             user_tasks.append(task_data['title'])
#             update_user(ObjectId(user_id), {'tasks': user_tasks})
#         resp.media = {'message': 'Task created successfully'}



from falcon import HTTP_200
from database.dao.tasks import TaskDatabase
from database.dao.users import UserDatabase
from resources.common_resource.common import MyJSONEncoder
import mimetypes
import falcon
from database.services.gridfile import fs
from json import JSONEncoder as _JSONEncoder, dumps
from datetime import datetime
from bson import json_util, ObjectId
from pymongo import MongoClient
from gridfs import GridFS

class TaskCollection:

    def __init__(self):
        self.task_db = TaskDatabase()
        self.user_db = UserDatabase()

    def make_task(self,values):
        task = {
            "title": values.get('title', ''),
            "date": values.get('date', datetime.now()),
            "priority": values.get('priority', 'normal'),
            "stage": values.get('stage', 'todo'),
            "activities": values.get('activities', []),
            "assets": values.get('assets', []),
            "team": values.get('team', []),
            "createdAt": values.get('createdAt', datetime.now()),
            "updatedAt": values.get('updatedAt', datetime.now()),
            "deletedAt": values.get('deletedAt', None)
        }
        return task

    def on_get(self, req, resp):
        tasks = self.task_db.get_tasks()
        for task in tasks:
            task["_id"] = str(task["_id"])
        resp.body = dumps(tasks, cls=MyJSONEncoder)
        resp.status = falcon.HTTP_200

    def on_post(self, req, resp):
        team_ids = [id.strip() for id in req.get_param_as_list('team')]
        task_data = {
            'title': req.get_param('title'),
            'date': req.get_param('date'),
            'team': team_ids,
            'stage': req.get_param('stage'),
            'priority': req.get_param('priority')
        }
        assets = req.get_param('assets')
        if assets is not None:
            asset_ids = []
            if not isinstance(assets, list):
                assets = [assets]
            for asset in assets:
                data = asset.file.read()
                asset_id = fs.put(data, filename=asset.filename, content_type=mimetypes.guess_type(
                    asset.filename)[0])
                asset_ids.append(str(asset_id))
            task_data['assets'] = asset_ids
        task = self.make_task(task_data)
        task_id = self.task_db.insert_task(task)
        for user_id in team_ids:
            user = self.user_db.get_user(ObjectId(user_id))
            user_tasks = user.get('tasks', [])
            user_tasks.append(task_data['title'])
            self.user_db.update_user(ObjectId(user_id), {'tasks': user_tasks})
        resp.media = {'message': 'Task created successfully'}


