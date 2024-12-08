import unittest
from unittest.mock import Mock
from falcon import testing
import falcon
from resources.users_resource.logout import LogoutResource

class TestLogoutResource(unittest.TestCase):
    def setUp(self):
        self.logout_resc = LogoutResource()
        self.req = Mock(spec=falcon.Request)
        self.resp = Mock(spec=falcon.Response)

    def test_on_get(self):
        self.logout_resc.on_get(self.req, self.resp)

        self.assertEqual(self.resp.status, falcon.HTTP_200)
        self.assertEqual(self.resp.media, {'logout': 'Success'})

if __name__ == '__main__':
    unittest.main()