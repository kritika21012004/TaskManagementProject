from database.dao.tasks import TaskDatabase
class AssetResource:
    def __init__(self):
        self.task_db = TaskDatabase()  # create an instance of TaskDatabase

    def on_get(self, req, resp, task_id, file_id):
        file = self.task_db.get_asset(file_id)  # use the instance to call get_asset
        resp.stream = file
        resp.content_length = file.length
        resp.content_type = file.content_type