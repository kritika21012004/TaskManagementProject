from pymongo import MongoClient
from gridfs import GridFS

client = MongoClient("mongodb+srv://gargkritika75:4awUaesue6nPQytL@taskmanagement.tltq3so.mongodb.net/")

# Create database
db = client["user_database"]
fs = GridFS(db)