from falcon_cors import CORS
import falcon
from app_middleware import serialize_image
from falcon_multipart.middleware import MultipartMiddleware
from user import UserLoginResource, UserRegistrationResource,UserProfileResource,ChangePasswordResource,LogoutResource, UsersCollection , SingleUserResource
from task import TaskCollection , SingleTaskResource, TodoTaskCount,TotalTasksCount,CompletedTaskCount,InprogressTaskCount
import gridfs
from gridfs import GridFS
from pymongo import MongoClient
from  gridfile  import fs,db
from bson import ObjectId


cors = CORS(allow_all_origins=True, allow_all_methods=True, allow_all_headers=True)
app = falcon.App(middleware=[MultipartMiddleware(), cors.middleware]) 
def get_asset(asset_id):
    return fs.get(ObjectId(asset_id))

class AssetResource:

   def on_get(self, req, resp, task_id, file_id):
       
        file = get_asset(file_id)
        resp.stream = file
        resp.content_length = file.length
        resp.content_type = file.content_type


login = UserLoginResource()
register = UserRegistrationResource()
logout = LogoutResource()
task_collection=TaskCollection()
single_task=SingleTaskResource()
users_collection = UsersCollection() 
single_user = SingleUserResource() 
user_profile = UserProfileResource()
change_password=ChangePasswordResource()
total_task_count = TotalTasksCount()
inprogress_task_count = InprogressTaskCount()
todo_task_count = TodoTaskCount()
completed_task_count = CompletedTaskCount()


app.add_route('/api/login', login)
app.add_route('/api/register', register)
app.add_route('/api/logout', logout)
app.add_route('/api/tasks', task_collection)
app.add_route('/api/tasks/{id}', single_task)
app.add_route('/api/users', users_collection) 
app.add_route('/api/users/{id}', single_user)
app.add_route('/api/profile', user_profile)
app.add_route('/api/password_change/{id}', change_password)
app.add_route('/api/total_tasks_count', total_task_count)
app.add_route('/api/inprogress_task_count', inprogress_task_count)
app.add_route('/api/todo_task_count', todo_task_count)
app.add_route('/api/completed_task_count', completed_task_count)
# app.add_route('/api/tasks/{task_id}/assets/{file_id}', AssetResource())
app.add_route('/api/tasks/assets/{task_id}/{file_id}', AssetResource())