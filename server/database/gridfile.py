from pymongo import MongoClient
import gridfs

client = MongoClient('localhost', 27017)

db = client['user_database']  
fs = gridfs.GridFS(db)