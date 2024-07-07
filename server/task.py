import jwt
import bcrypt
import falcon
from json import JSONEncoder as _JSONEncoder, dumps
from datetime import datetime
from bson import json_util, ObjectId
from pymongo import MongoClient
from gridfs import GridFS
from db import insert_task,get_task,get_tasks,update_task,delete_task,get_user,update_user,insert_asset,get_tasks_count,get_completed_tasks_count,get_todo_tasks_count,get_inprogress_tasks_count
from gridfile import fs,db
import mimetypes

def make_task(values):
    task = {
       "title": values.get('title', ''),
        "date": values.get('date' , datetime.now()),
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

class MyJSONEncoder(_JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        elif isinstance(o, datetime):
            return o.isoformat()  # convert datetime objects to ISO format
        return super().default(o)




# class TaskCollection:
    # def on_get(self, req, resp):
    #     tasks = get_tasks()
    #     for task in tasks:
    #         task["_id"] = str(task["_id"])      
    #     resp.body = dumps(tasks, cls=MyJSONEncoder)
    #     resp.status = falcon.HTTP_200

    # def on_post(self, req, resp):
    #     task_data = {
    #         'title': req.get_param('title'),
    #         'date': req.get_param('date'),
    #         'team': req.get_param_as_list('team'),  # Assumes team is a list of user IDs
    #         'stage': req.get_param('stage'),
    #         'priority': req.get_param('priority'),
    #         'assets': req.get_param('assets')  # This is a file. Handle this separately.
    #     }
    #     task = make_task(task_data)
    #     task_id = insert_task(task)

    #     # Update user `tasks` for each user in `team`
    #     for user_id in req.get_param_as_list('team'):  # Assumes that `team` is a list of user IDs
    #         user = get_user(ObjectId(user_id))
    #         user_tasks = user.get('tasks', [])
    #         user_tasks.append(task_data['title'])  # Store task title instead of task_id
    #         update_user(ObjectId(user_id), {'tasks': user_tasks})

    #     resp.media = {'message': 'Task created successfully'}
class TaskCollection:
    def on_get(self, req, resp):
        tasks = get_tasks()
        for task in tasks:
            task["_id"] = str(task["_id"])      
        resp.body = dumps(tasks, cls=MyJSONEncoder)
        resp.status = falcon.HTTP_200
        

    def on_post(self, req, resp):
        # db = MongoClient().db
        # fs = GridFS(db)
        task_data = {
            'title': req.get_param('title'),
            'date': req.get_param('date'),
            'team': req.get_param_as_list('team'),
            'stage': req.get_param('stage'),
            'priority': req.get_param('priority')
        }

        assets = req.get_param('assets')
        print(assets, "--------------------------------------")
        if assets is not None:
            asset_ids = []
            if not isinstance(assets, list):
                assets = [assets]  # convert to list if only one asset

            for asset in assets:
                data = asset.file.read()  
                asset_id = fs.put(data, filename=asset.filename, content_type=mimetypes.guess_type(asset.filename)[0])  # save to GridFS
                asset_ids.append(str(asset_id))  # convert to string before storing
            task_data['assets'] = asset_ids

        task = make_task(task_data)
        task_id = insert_task(task)
        team_ids = [id.strip() for id in req.get_param('team').split(',')]
        for user_id in team_ids:
            user = get_user(ObjectId(user_id))
            user_tasks = user.get('tasks', [])
            if not user_tasks:
                user_tasks = []
            elif not isinstance(user_tasks, list):
                user_tasks = [user_tasks] # convert str to list
            # user_tasks.append(str(task_id))
            user_tasks.append(task_data['title'])
            update_user(ObjectId(user_id), {'tasks': user_tasks})

        resp.media = {'message': 'Task created successfully'}
    # def on_get(self, req, resp, id):
    #     data = fs.get(ObjectId(id))
    #     resp.stream, resp.content_length = data, data.length
    #     resp.content_type = data.content_type


class SingleTaskResource:
    def on_get(self, req, resp, id):
        task = get_task(ObjectId(id))
        resp.body = dumps(task, cls=MyJSONEncoder)
        resp.status = falcon.HTTP_200

    # def on_put(self, req, resp, id):
        
    #     task_data = req.media
        
    #     print("#############  ", task_data['assets'])
    #     assets = req.get_param('assets')
    #     print(assets)
        # print(assets, "===========================")
        # if assets is not None:
        #     asset_ids = []
        #     if not isinstance(assets, list):
        #         assets = [assets]  # convert to list if only one asset

        #     for asset in assets:
        #         data = asset.file.read()  
        #         asset_id = fs.put(data, filename=asset.filename, content_type=mimetypes.guess_type(asset.filename)[0])  # save to GridFS
        #         asset_ids.append(str(asset_id))  # convert to string before storing
        #         p
        #     task_data['assets'] = asset_ids
        
        # print(task_data)
        # task = make_task(task_data)
        # print(task)
        # update_task(ObjectId(id), task)
        # resp.media = {'message': 'Task updated successfully'}




    # def on_put(self, req, resp, id):
    #     updated_task_data = {}
    #     for key in ['title', 'date', 'stage', 'priority']:
    #         value = req.get_param(key)
    #         if value:
    #             updated_task_data[key] = value

    #     team = req.get_param_as_list('team')
    #     if team:
    #         updated_task_data['team'] = [item.strip() for item in team]

    #     asset_files = req.get_param('assets')
    #     if asset_files is not None:
    #         asset_ids = []
    #         if not isinstance(asset_files, list):
    #             asset_files = [asset_files]  # convert it to list if only one file
    #         for asset in asset_files:
    #             asset_data = asset.file.read()  
    #             asset_id = fs.put(asset_data, filename=asset.filename, content_type=mimetypes.guess_type(asset.filename)[0])
    #             asset_ids.append(str(asset_id))  # convert to string before storing
    #         updated_task_data['assets'] = asset_ids  # update assets

    #     # update the task
    #     update_task(ObjectId(id), updated_task_data)

    #     resp.media = {'message': 'Task updated successfully'}


    def on_put(self, req, resp, id):
        updated_task_data = {}
        for key in ['title', 'date', 'stage', 'priority']:
            value = req.get_param(key)
            if value:
                updated_task_data[key] = value

        team = req.get_param_as_list('team')
        if team:
            updated_task_data['team'] = [item.strip() for item in team]

        assets = req.get_param('assets')
        if assets is not None:
            asset_ids = []
            if not isinstance(assets, list):
                assets = [assets]  # make it a list if only one file

            for asset in assets:
                if hasattr(asset, 'file'):  # only perform file operations if 'file' attribute is present
                    asset_data = asset.file.read()
                    asset_id = fs.put(asset_data, filename=asset.filename, content_type=mimetypes.guess_type(asset.filename)[0])
                    asset_ids.append(str(asset_id))  # convert ObjectId to string before storing
            updated_task_data['assets'] = asset_ids

        else:
            # If no 'assets' in request, keep the existing asset(s) in the task
            original_task = get_task(ObjectId(id))
            updated_task_data['assets'] = original_task['assets']

        # Update database
        update_task(ObjectId(id), updated_task_data)

        resp.media = {'message': 'Task Updated Successfully'}

    def on_delete(self, req, resp, id):
        print("delete")
        print(id)
        task_deleted = delete_task(ObjectId(id))
        # if task_deleted is None:
        #     raise falcon.HTTPNotFound(description="Task not found")
        resp.media = {'message': 'Task deleted successfully'}


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