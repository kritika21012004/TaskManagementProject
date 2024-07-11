import pytest
import json
import falcon
from datetime import datetime
from bson import ObjectId
from resources.common_resource.common import MyJSONEncoder # Assumes the written class is in my_code.py

def test_json_encoder_with_object_id():
    obj_id = ObjectId()
    data = {"id": obj_id}
    encoder = MyJSONEncoder()
    result = json.loads(encoder.encode(data))
    assert result["id"] == str(obj_id)

def test_json_encoder_with_datetime():
    dt = datetime.now()
    data = {"created_at": dt}
    encoder = MyJSONEncoder()
    result = json.loads(encoder.encode(data))
    assert result["created_at"] == dt.isoformat()

def test_json_encoder_with_combined_data():
    obj_id = ObjectId()
    dt = datetime.now()
    data = {"id": obj_id, "created_at": dt}
    encoder = MyJSONEncoder()
    result = json.loads(encoder.encode(data))
    assert result["id"] == str(obj_id)
    assert result["created_at"] == dt.isoformat()

def test_json_encoder_with_non_supported_type():
    class Dummy: pass
    data = {"dummy": Dummy()}
    encoder = MyJSONEncoder()
    with pytest.raises(TypeError):
        encoder.encode(data)