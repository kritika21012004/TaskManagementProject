from json import JSONEncoder as _JSONEncoder
from datetime import datetime
from bson import ObjectId

class MyJSONEncoder(_JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        elif isinstance(o, datetime):
            return o.isoformat()
        return super().default(o)
