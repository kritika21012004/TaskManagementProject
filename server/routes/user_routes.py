from resources.users.change_password import ChangePasswordResource
from resources.users.user_login import UserLoginResource
from resources.users.user_profile import UserProfileResource
from resources.users.user_registeration import UserRegistrationResource
from resources.users.users_collection import UsersCollection
from resources.users.single_userresource import SingleUserResource
from resources.users.logout import LogoutResource


class UserRoutes:

    def __init__(self, app):
        self.app = app

    def include_routes(self):
        self.app.add_route('/api/login', UserLoginResource())
        self.app.add_route('/api/register', UserRegistrationResource())
        self.app.add_route('/api/logout', LogoutResource())
        self.app.add_route('/api/users', UsersCollection())
        self.app.add_route('/api/users/{id}', SingleUserResource())
        self.app.add_route('/api/profile', UserProfileResource())
        self.app.add_route('/api/password_change/{id}', ChangePasswordResource())