from database.dao.tasks import TaskDatabase

class TaskCountResource:
    def __init__(self):
        self.tasks_db = TaskDatabase() 

    def on_get(self, req, resp):
        tasks_count = self.tasks_db.get_tasks_count() 
        todo_count = self.tasks_db.get_todo_tasks_count() 
        inprogress_count = self.tasks_db.get_inprogress_tasks_count() 
        completed_count = self.tasks_db.get_completed_tasks_count() 

        resp.media = {
            'Total Tasks': tasks_count,
            'Todo Tasks': todo_count,
            'In progress Tasks': inprogress_count,
            'Completed Tasks': completed_count
        }