from resources.user import UserLoginResource, UserRegistrationResource,UserProfileResource,ChangePasswordResource, LogoutResource, UsersCollection, SingleUserResource

def include_routes(app):
    app.add_route('/api/login', UserLoginResource())
    app.add_route('/api/register', UserRegistrationResource())
    app.add_route('/api/logout', LogoutResource())
    app.add_route('/api/users', UsersCollection())
    app.add_route('/api/users/{id}', SingleUserResource())
    app.add_route('/api/profile', UserProfileResource())
    app.add_route('/api/password_change/{id}', ChangePasswordResource())