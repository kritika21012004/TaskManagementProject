import falcon
import jwt
from models import User
import os

class ProtectResource:

    def process_request(self, req, resp):
        token = req.cookies.get('token')

        if token:
            try:
                decoded_token = jwt.decode(token, os.getenv('JWT_SECRET'), algorithms=["HS256"])
                user = User.objects.get(id=decoded_token['userId'])

                req.context.user = {
                    'email': user.email,
                    'isAdmin': user.isAdmin,
                    'userId': user.id
                }

            except Exception as error:
                raise falcon.HTTPUnauthorized('Not authorized',
                                              'Not authorized. Try login again.')
        else:
            raise falcon.HTTPUnauthorized('Not authorized', 'Not authorized. Try login again.')


class IsAdminResource:

    def process_request(self, req, resp):
        if req.context.user and req.context.user['isAdmin']:
            pass
        else:
            raise falcon.HTTPUnauthorized('Not authorized',
                                          'Not authorized as admin. Try login as admin.')