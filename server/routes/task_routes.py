from resources.tasks_resource.asset_resource import AssetResource
from resources.tasks_resource.single_task_resource import SingleTaskResource
from resources.tasks_resource.task_collection import TaskCollection
from resources.tasks_resource.task_count_resource import TaskCountResource

class TaskRoutes:

    def __init__(self, app):
        self.app = app

    def include_routes(self):
        self.app.add_route('/api/tasks', TaskCollection())
        self.app.add_route('/api/tasks/{id}', SingleTaskResource())
        self.app.add_route('/api/tasks_count', TaskCountResource())
        self.app.add_route('/api/tasks/assets/{task_id}/{file_id}', AssetResource())