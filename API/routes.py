from flask import Blueprint, jsonify, request
from API.csv_loader import CsvLoader

plotter_blueprint = Blueprint('plotter', __name__)
csv_loader = CsvLoader()

@plotter_blueprint.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify({
        'status': 'success',
        'message': 'pong!'
    })


@plotter_blueprint.route('/readcsv', methods=['POST'])
def read_data():
    post_data = request.get_json()
    try:
        filename = post_data.get('filename')
        limit = post_data.get('limit')
        csv_loader.read_data_from_csv(filename, limit)
        return jsonify({'status': 'success'}), 200
    except:
        return jsonify({'status': 'failure'}), 404


@plotter_blueprint.route('/getcol/<col_name>', methods=['GET'])
def get_column(col_name):
    try:
        col_values = csv_loader.get_column_values(col_name)
        return jsonify({
            'status': 'success',
            'data': col_values
        }), 200
    except:
        return jsonify({'status': 'failure'}), 404
