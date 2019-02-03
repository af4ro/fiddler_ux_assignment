import os
from flask import Flask
from flask_cors import CORS

def create_app():
    # instantiate the app
    app = Flask(__name__)

    # enable CORS
    CORS(app)

    from API.plotter import plotter_blueprint
    app.register_blueprint(plotter_blueprint)

    # shell context for flask cli
    @app.shell_context_processor
    def ctx():
        return {'app': app}

    return app


if __name__ == "__main__":
    app = create_app()
