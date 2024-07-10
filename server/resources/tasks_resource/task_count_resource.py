from database.dao.tasks import TaskDatabase

class TaskCountResource:
    def __init__(self):
        self.tasks_db = TaskDatabase() 

    def on_get(self, req, resp):
        try:
            tasks_count = self.tasks_db.get_tasks_count()
            todo_count = self.tasks_db.get_todo_tasks_count()
            if todo_count and todo_count > tasks_count:
                raise ValueError('Invalid Counts: TodoCount is more than Total Tasks Count')

            inprogress_count = self.tasks_db.get_inprogress_tasks_count()
            if inprogress_count and inprogress_count > tasks_count:
                raise ValueError('Invalid Counts: InProgressCount is more than Total Tasks Count')

            completed_count = self.tasks_db.get_completed_tasks_count()
            if completed_count and completed_count > tasks_count:
                raise ValueError('Invalid Counts: CompletedCount is more than Total Tasks Count')

            resp.media = {
                'Total Tasks': tasks_count,
                'Todo Tasks': todo_count,
                'In progress Tasks': inprogress_count,
                'Completed Tasks': completed_count
            }

        except ValueError as error:
            resp.status = falcon.HTTP_500
            resp.media = {'error': str(error)}
        except Exception:  
            resp.status = falcon.HTTP_500
            resp.media = {'error': 'Database Error'}