from pymongo import MongoClient
import gridfs

client = MongoClient("mongodb+srv://gargkritika75:4awUaesue6nPQytL@taskmanagement.tltq3so.mongodb.net/")

db = client['user_database']  
fs = gridfs.GridFS(db)