import falcon   
from database.dao.tasks import TaskDatabase
from database.dao.users import UserDatabase
from falcon import HTTP_200
from json import dumps 
from ..common_resource.common  import MyJSONEncoder
from .remove_task_from_users import UserTasks
from database.services.gridfile import fs
from bson.objectid import ObjectId
import mimetypes


class SingleTaskResource:
    def __init__(self):
        self.task_db = TaskDatabase()
        self.user_db = UserDatabase()
        self.user_tasks = UserTasks() 
        
    def on_get(self, req, resp, id):
        task = self.task_db.get_task(ObjectId(id))
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
            old_task = self.task_db.get_task(ObjectId(id))
            old_team_ids = old_task.get('team', []) if old_task else []
            for user_id in team_ids:
                if user_id not in old_team_ids:
                    user = self.user_db.get_user(ObjectId(user_id))
                    user_tasks = user.get('tasks', [])
                    user_tasks.append(updated_task_data['title'])
                    self.user_db.update_user(ObjectId(user_id), {'tasks': user_tasks})
            for user_id in old_team_ids:
                if user_id not in team_ids:
                    user = self.user_db.get_user(ObjectId(user_id))
                    user_tasks = user.get('tasks', [])
                    if updated_task_data['title'] in user_tasks:
                          user_tasks.remove(updated_task_data['title'])
                    self.user_db.update_user(ObjectId(user_id), {'tasks': user_tasks})

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
            original_task = self.task_db.get_task(ObjectId(id))
            updated_task_data['assets'] = original_task.get('assets', [])
        self.task_db.update_task(ObjectId(id), updated_task_data)
        resp.media = {'message': 'Task Updated Successfully'}

    def on_delete(self, req, resp, id):
        task_to_delete = self.task_db.get_task(ObjectId(id))
        if task_to_delete:
            task_title = task_to_delete['title']
            task_deleted = self.task_db.delete_task(ObjectId(id))
            if task_deleted:
                self.user_tasks.remove_task_from_all_users(task_title)
                resp.media = {'message': 'Task deleted successfully'}
            else:
                resp.media = {'message': 'Task deletion failed'}
        else:
            resp.media = {'message': 'Task does not exist'}

