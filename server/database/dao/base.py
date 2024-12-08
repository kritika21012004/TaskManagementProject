from pymongo import MongoClient
from gridfs import GridFS

class Database:
    def __init__(self):
        client = MongoClient("mongodb://localhost:27017/")
        self.db = client["user_database"]
        self.fs = GridFS(self.db)