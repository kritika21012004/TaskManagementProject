from pymongo import MongoClient
from gridfs import GridFS

client = MongoClient("mongodb://localhost:27017/")

# Create database
db = client["user_database"]
fs = GridFS(db)