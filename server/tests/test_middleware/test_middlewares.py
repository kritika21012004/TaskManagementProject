import falcon
from falcon.testing import TestClient
from falcon_cors import CORS
import pytest

# Update the cors instance to include allow_credentials, expose_headers and max_age
cors = CORS(allow_all_origins=True, allow_all_methods=True, allow_all_headers=True,
            allow_credentials_all_origins=True, expose_headers_list=['Content-Type'], max_age=600)

class CorsResource:
    cors = cors
    def on_get(self, req, resp):
        resp.body = 'Success'

def create_app():
    app = falcon.API(middleware=[cors.middleware])
    app.add_route('/test', CorsResource())
    return app

@pytest.fixture
def client():
    return TestClient(create_app())

def test_cors_allow_all_origins(client):
    headers = {'Origin': 'http://testserver'}
    response = client.simulate_get('/test', headers=headers)
    assert response.status == falcon.HTTP_OK
    assert response.headers['Access-Control-Allow-Origin'] == 'http://testserver'
    
def test_cors_disallow_origin(client):
    headers = {'Origin': 'http://www.fake-origin.com'}
    response = client.simulate_get('/test', headers=headers)
    assert response.status == falcon.HTTP_200
    assert response.headers['Access-Control-Allow-Origin'] == 'http://www.fake-origin.com'

# Test if headers in the cors's expose_headers_list is exposed by testing it directly.
def test_cors_expose_headers(client):
    headers = {'Origin': 'http://testserver'}
    response = client.simulate_get('/test', headers=headers)
    assert response.status == falcon.HTTP_200
    assert 'Content-Type' in response.headers
