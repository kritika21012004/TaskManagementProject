from datetime import datetime

class Task:
    def __init__(self, title, date,  priority='normal', stage='todo', activities='', assets='', team=''):
        self.title = title
        self.date = date
        self.priority = priority
        self.stage = stage
        self.activities = activities
        self.assets = assets
        self.team = team
        self.createdAt = datetime.now()
        self.updatedAt = datetime.now()
        self.deletedAt = None