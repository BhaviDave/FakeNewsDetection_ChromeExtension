from flask import request
from os import environ
from flask import jsonify,make_response
from flask import Flask


app = Flask(__name__)

# Declaring Constants
FLASK_HOST = environ.get("FLASK_HOST") or '0.0.0.0'


@app.route('/check_story', methods=["POST", "GET"])
def get_prediction_from_model():
        try:
            data = request.get_json()
            article = data['article']
            #print('text: {}\n'.format(text))
            #todo make a real endpoint
            return jsonify({"inference" : article})
        except Exception as e:
            return jsonify({"result": "Error getting the  Score"})


# Staring the App
if __name__ == '__main__':
    app.run(host=FLASK_HOST)