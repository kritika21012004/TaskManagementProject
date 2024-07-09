from resources.task import TaskCollection, SingleTaskResource, TodoTaskCount, TotalTasksCount, CompletedTaskCount, InprogressTaskCount, AssetResource

def include_routes(app):
    app.add_route('/api/tasks', TaskCollection())
    app.add_route('/api/tasks/{id}', SingleTaskResource())
    app.add_route('/api/total_tasks_count', TotalTasksCount())
    app.add_route('/api/inprogress_task_count', InprogressTaskCount())
    app.add_route('/api/todo_task_count', TodoTaskCount())
    app.add_route('/api/completed_task_count', CompletedTaskCount())
    app.add_route('/api/tasks/assets/{task_id}/{file_id}', AssetResource())