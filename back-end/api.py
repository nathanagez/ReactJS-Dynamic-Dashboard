import os
import sys
import hashlib
import jwt
from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import json_util
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


secret = "lauraesttropbelle"

client = MongoClient(
    "mongodb://mongo:27017/",
    27017)
db = client["dashboard"]

# Register route
@app.route('/register', methods=['POST'])
def register():
    users = db.users
    try:
        username = request.json['username']
        email = request.json['email']
        password = request.json['password']
    except:
        return jsonify({'success': False, 'message': 'Malformed body'}), 400
    user = users.find_one({"email": email})
    if user is None:
        h = hashlib.md5(str(password).encode())
        new_user = users.insert_one(
            {"username": username, "email": email, "password": h.hexdigest()}).inserted_id
        # print(new_user, file=sys.stderr)
        return jsonify({'success': True, 'message': "Registered!"}), 200
    return jsonify({'success': False, 'message': 'User already exist with this email'}), 400

# Login route
@app.route('/login', methods=['POST'])
def login():
    users = db.users
    try:
        email = request.json['email']
        password = request.json['password']
    except:
        return jsonify({'success': False, 'message': 'Malformed body'}), 400
    user = users.find_one({"email": email})
    if user is not None:
        h = hashlib.md5(str(password).encode())
        if (user['password'] == h.hexdigest()):
            user['_id'] = str(user['_id'])
            # print(user, file=sys.stderr)
            encoded_jwt = jwt.encode(
                {'payload': user}, secret, algorithm='HS256')
            print(encoded_jwt, file=sys.stderr)
            return jsonify({'success': True, 'token': str(encoded_jwt.decode())}), 200
            # Renvoyer le token ici
        return jsonify({'success': False, 'message': 'Invalid password'}), 403
    return jsonify({'success': False, 'message': 'User does not exist, cunt!'}), 403

# User route
@app.before_request
def option_autoreply():
    """ Always reply 200 on OPTIONS request """

    if request.method == 'OPTIONS':
        resp = app.make_default_options_response()

        headers = None
        if 'ACCESS_CONTROL_REQUEST_HEADERS' in request.headers:
            headers = request.headers['ACCESS_CONTROL_REQUEST_HEADERS']

        h = resp.headers

        # Allow the origin which made the XHR
        h['Access-Control-Allow-Origin'] = request.headers['Origin']
        # Allow the actual method
        h['Access-Control-Allow-Methods'] = request.headers['Access-Control-Request-Method']
        # Allow for 10 seconds
        h['Access-Control-Max-Age'] = "10"

        # We also keep current headers
        if headers is not None:
            h['Access-Control-Allow-Headers'] = headers

        return resp
@app.after_request
def set_allow_origin(resp):
    """ Set origin for GET, POST, PUT, DELETE requests """

    h = resp.headers

    # Allow crossdomain for other HTTP Verbs
    if request.method != 'OPTIONS' and 'Origin' in request.headers:
        h['Access-Control-Allow-Origin'] = request.headers['Origin']

    return resp
def hook():
    # Allow the actual method
    if request.endpoint == 'getUser':
        print(request.headers.get('Authorization'), file=sys.stderr)
        try:
            jwt.decode(request.headers.get(
                'Authorization').split(), secret, verify=True)
        except:
            return jsonify({'success': False, 'message': 'Invalid token'}), 403


@app.route('/user', methods=['GET'])
def getUser():
    token = jwt.decode(request.headers['Authorization'], secret, verify=True)
    users = db.users
    user = users.find_one({'_id': ObjectId(token['payload']['_id'])})
    del user['password']
    user['_id'] = str(user['_id'])
    print(user, file=sys.stderr)
    return jsonify({'success': True, 'userData': user}), 200


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=5000)
