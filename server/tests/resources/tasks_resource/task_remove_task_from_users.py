from UserTasks import UserTasks
from database.dao.users import UserDatabase
from unittest.mock import Mock, patch
from bson.objectid import ObjectId
import pytest

@pytest.fixture
def setup():
    mock_userdb = Mock(spec=UserDatabase)
    mock_userdb.get_users.return_value = [{'_id': str(ObjectId()), 'name': 'John', 'tasks': ['Task1', 'Task2']}]
    mock_userdb.update_user.return_value = None
    with patch('UserTasks.UserDatabase', autospec=True) as mock_userdb:
        user_tasks_object = UserTasks()
        user_tasks_object.user_db = mock_userdb
    yield user_tasks_object

# Test that function works normally.
def test_remove_task_from_all_users_normal(setup):
    setup.remove_task_from_all_users('Task1')
    assert setup.user_db.get_users.call_count == 1
    assert setup.user_db.update_user.call_count == 1

# Test when there is no data in the collection
def test_remove_task_from_all_users_empty_collection(setup):
    setup.user_db.get_users.return_value = []
    setup.remove_task_from_all_users('Task1')
    assert setup.user_db.get_users.call_count == 1
    assert setup.user_db.update_user.call_count == 0

# Test when user has no "tasks" field
def test_remove_task_from_all_users_no_tasks_field(setup):
    setup.user_db.get_users.return_value = [{'_id': str(ObjectId()), 'name': 'John'}]
    setup.remove_task_from_all_users('Task1')
    assert setup.user_db.get_users.call_count == 1
    assert setup.user_db.update_user.call_count == 0

# Test when "tasks" field is empty list
def test_remove_task_from_all_users_empty_tasks(setup):
    setup.user_db.get_users.return_value = [{'_id': str(ObjectId()), 'name': 'John', 'tasks': []}]
    setup.remove_task_from_all_users('Task1')
    assert setup.user_db.get_users.call_count == 1
    assert setup.user_db.update_user.call_count == 0

# Test when task does not exist
def test_remove_task_from_all_users_task_does_not_exist(setup):
    setup.user_db.get_users.return_value = [{'_id': str(ObjectId()), 'name': 'John', 'tasks': ['TaskA', 'TaskB']}]
    setup.remove_task_from_all_users('Task1')
    assert setup.user_db.get_users.call_count == 1
    assert setup.user_db.update_user.call_count == 0