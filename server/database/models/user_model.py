from datetime import datetime
from database import db

class User:
    def __init__(self, email, username, password, role='user', tasks=[], isActive=True):
        self.name = username
        self.email = email
        self.password = password
        self.role = role
        self.tasks = tasks
        self.isActive = isActive
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.deleted_at = None