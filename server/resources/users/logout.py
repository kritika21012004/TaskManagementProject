import jwt
import bcrypt
import falcon
import json
from bson import ObjectId
from json import JSONEncoder as _JSONEncoder, dumps
from datetime import datetime
from ..common_resource.common  import MyJSONEncoder



class LogoutResource:
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.media = {'logout': 'Success'}
