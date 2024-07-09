import jwt
import bcrypt
import falcon
from json import JSONEncoder as _JSONEncoder, dumps
from datetime import datetime
from bson import json_util, ObjectId
from pymongo import MongoClient
from gridfs import GridFS
from database.users import get_user, update_user, get_users
from database.tasks import insert_task, get_task, get_tasks, update_task, delete_task, insert_asset, get_tasks_count, get_completed_tasks_count, get_todo_tasks_count, get_inprogress_tasks_count, get_asset
from database.gridfile import fs
from .common import MyJSONEncoder
import mimetypes



def make_task(values):
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


def remove_task_from_all_users(task_title):
    users = get_users()
    for user in users:
        if "tasks" in user and task_title in user["tasks"]:
            user["tasks"].remove(task_title)
            update_user(ObjectId(user["_id"]), {'tasks': user["tasks"]})


class TaskCollection:
    def on_get(self, req, resp):
        tasks = get_tasks()
        for task in tasks:
            task["_id"] = str(task["_id"])
        resp.body = dumps(tasks, cls=MyJSONEncoder)
        resp.status = falcon.HTTP_200

    def on_post(self, req, resp):
        team_ids = [id.strip() for id in req.get_param('team').split(',')]
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
        task = make_task(task_data)
        task_id = insert_task(task)
        for user_id in team_ids:
            user = get_user(ObjectId(user_id))
            user_tasks = user.get('tasks', [])
            user_tasks.append(task_data['title'])
            update_user(ObjectId(user_id), {'tasks': user_tasks})
        resp.media = {'message': 'Task created successfully'}


class SingleTaskResource:
    def on_get(self, req, resp, id):
        task = get_task(ObjectId(id))
        resp.body = dumps(task, cls=MyJSONEncoder)
        resp.status = falcon.HTTP_200

    def on_put(self, req, resp, id):
        updated_task_data = {}
        for key in ['title', 'date', 'stage', 'priority']:
            value = req.get_param(key)
            if value:
                updated_task_data[key] = value
        team = req.get_param_as_list('team')
        if team:
            team_ids = [item.strip() for item in team]
            updated_task_data['team'] = team_ids
            for user_id in team_ids:
                user = get_user(ObjectId(user_id))
                user_tasks = user.get('tasks', [])
                user_tasks.append(updated_task_data['title'])
                update_user(ObjectId(user_id), {'tasks': user_tasks})
        assets = req.get_param('assets')
        if assets is not None and assets != '' and assets != 'null':
            asset_ids = []
            if not isinstance(assets, list):
                assets = [assets]
            new_assets = [a for a in assets if hasattr(a, 'file') and a.file]
            for asset in new_assets:
                asset_data = asset.file.read()
                asset_id = fs.put(asset_data, filename=asset.filename,
                                  content_type=mimetypes.guess_type(asset.filename)[0])
                asset_ids.append(str(asset_id))
            if asset_ids:
                updated_task_data['assets'] = asset_ids
        else:
            print("No new asset in request...")
            original_task = get_task(ObjectId(id))
            updated_task_data['assets'] = original_task.get('assets', [])
        update_task(ObjectId(id), updated_task_data)
        resp.media = {'message': 'Task Updated Successfully'}

    def on_delete(self, req, resp, id):
        task_to_delete = get_task(ObjectId(id))
        if task_to_delete:
            task_title = task_to_delete['title']
            task_deleted = delete_task(ObjectId(id))
            if task_deleted:
                remove_task_from_all_users(task_title)
                resp.media = {'message': 'Task deleted successfully'}
            else:
                resp.media = {'message': 'Task deletion failed'}
        else:
            resp.media = {'message': 'Task does not exist'}


class TotalTasksCount:
    def on_get(self, req, resp):
        tasks_count = get_tasks_count()
        resp.media = {'Total Tasks': tasks_count}


class InprogressTaskCount:
    def on_get(self, req, resp):
        inprogress_count = get_inprogress_tasks_count()
        resp.media = {'In progress Tasks': inprogress_count}


class TodoTaskCount:
    def on_get(self, req, resp):
        todo_count = get_todo_tasks_count()
        resp.media = {'Todo Tasks': todo_count}


class CompletedTaskCount:
    def on_get(self, req, resp):
        completed_count = get_completed_tasks_count()
        resp.media = {'Completed Tasks': completed_count}


class AssetResource:
    def on_get(self, req, resp, task_id, file_id):
        file = get_asset(file_id)
        resp.stream = file
        resp.content_length = file.length
        resp.content_type = file.content_type
