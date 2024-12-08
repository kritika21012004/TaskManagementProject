from falcon import App
from falcon_multipart.middleware import MultipartMiddleware
from middleware.middlewares import cors
from routes.task_routes import TaskRoutes
from routes.user_routes import UserRoutes

app = App(middleware=[MultipartMiddleware(), cors.middleware])

task_route = TaskRoutes(app)
task_route.include_routes()

user_route = UserRoutes(app)
user_route.include_routes()