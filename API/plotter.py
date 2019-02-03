from flask import Blueprint, jsonify

plotter_blueprint = Blueprint('plotter', __name__)


@plotter_blueprint.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify({
        'status': 'success',
        'message': 'pong!'
    })