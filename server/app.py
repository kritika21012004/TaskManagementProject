from falcon import App
from falcon_multipart.middleware import MultipartMiddleware
from middleware.middlewares import cors
from routes import user_routes, task_routes


app = App(middleware=[MultipartMiddleware(), cors.middleware])

user_routes.include_routes(app)
task_routes.include_routes(app)
