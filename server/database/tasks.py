from datetime import datetime
from bson.objectid import ObjectId
from database import db, fs

# Create collection
tasks_in_db = db["tasks"]


def insert_task(task_info):
     task_info['createdAt'] = datetime.now()
     task_info['updatedAt'] = datetime.now()
     tasks_in_db.insert_one(task_info)

def get_tasks():
    return list(tasks_in_db.find())

def get_task(task_id):
    return tasks_in_db.find_one({"_id": ObjectId(task_id)})

def update_task(task_id, new_values):
    new_values['updatedAt'] = datetime.now()
    tasks_in_db.update_one({"_id": ObjectId(task_id)}, {"$set": new_values})

#softdelete
# def delete_task(task_id):
#     tasks_in_db.update_one({"_id": ObjectId(task_id)}, {"$set": {'deletedAt': datetime.now()}})

def delete_task(task_id):
  return tasks_in_db.delete_one({"_id": ObjectId(task_id)})

def find_tasks_by_ids(task_ids): 
    return tasks_in_db.find({'_id': {'$in': task_ids}})

def find_tasks_by_titles(titles):
    if titles and isinstance(titles, list):
        return list(db.tasks.find({'title': { '$in': titles }}))
    else:
        return [] 

def insert_asset(file_item):
    asset_id = fs.put(file_item.file, filename=file_item.filename, content_type=file_item.type);
    return asset_id

def get_asset(asset_id):
    return fs.get(ObjectId(asset_id))

def get_tasks_count():
    return tasks_in_db.count_documents({})

def get_inprogress_tasks_count():
    return tasks_in_db.count_documents({'stage': 'IN PROGRESS'})

def get_todo_tasks_count():
    return tasks_in_db.count_documents({'stage': 'TODO'})

def get_completed_tasks_count():
    return tasks_in_db.count_documents({'stage': 'COMPLETED'})

def get_asset(asset_id):
    return fs.get(ObjectId(asset_id))