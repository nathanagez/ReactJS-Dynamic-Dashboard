import os
import sys
import hashlib
import jwt
import time
from flask import Flask, jsonify, request, Response, render_template, send_from_directory
from pymongo import MongoClient
from bson import json_util
from bson.objectid import ObjectId
from bson import json_util, ObjectId
import json
import requests

from bson.json_util import dumps
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder="./www/")
CORS(app)


secret = "lauraesttropbelle"

client = MongoClient(
    "mongodb://mongo:27017/",
    27017)
db = client["dashboard"]

# Register route
@app.route('/api/register', methods=['POST'])
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
@app.route('/api/login', methods=['POST'])
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
    if request.endpoint != 'login' and request.endpoint != 'register' and request.endpoint != 'catch_all':
        print(request.headers.get('Authorization'), file=sys.stderr)
        try:
            jwt.decode(request.headers.get(
                'Authorization').split(), secret, verify=True)
        except:
            return jsonify({'success': False, 'message': 'Invalid token'}), 403


@app.route('/api/user', methods=['GET'])
def getUser():
    token = jwt.decode(request.headers['Authorization'], secret, verify=True)
    users = db.users
    user = users.find_one({'_id': ObjectId(token['payload']['_id'])})
    del user['password']
    user['_id'] = str(user['_id'])
    print(user, file=sys.stderr)
    return jsonify({'success': True, 'userData': user}), 200


@app.route('/api/add_service', methods=['POST'])
def addService():
    token = jwt.decode(request.headers['Authorization'], secret, verify=True)
    services = db.services
    try:
        serviceName = request.json['serviceName']
        serviceToken = request.json['serviceToken']
        userId = token['payload']['_id']
    except:
        return jsonify({'success': False, 'message': 'Malformed body'}), 400
    service = services.find_one(
        {"serviceName": serviceName, "userId": token['payload']['_id']})
    if service is None:
        new_service = services.insert_one(
            {"serviceName": serviceName, "serviceToken": serviceToken, "userId": userId}).inserted_id
        # print(new_user, file=sys.stderr)
        user_services = list(services.find(
            {"userId": token['payload']['_id']}))
        return Response(json.dumps(user_services, default=json_util.default), headers={'Content-Type': 'application/json'})
    services.find_one_and_update({"serviceName": serviceName, "userId": token['payload']['_id']}, {
                                 "$set": {"serviceToken": serviceToken}})
    return jsonify({'success': True, 'message': "Service updated"}), 200


@app.route('/api/services', methods=['GET'])
def getServices():
    token = jwt.decode(request.headers['Authorization'], secret, verify=True)
    print(token['payload']['_id'], file=sys.stderr)
    services = db.services
    user_services = list(services.find({"userId": token['payload']['_id']}))
    print(user_services, file=sys.stderr)
    return Response(json.dumps(user_services, default=json_util.default), headers={'Content-Type': 'application/json'})


@app.route('/api/add_office', methods=['POST'])
def addOffice():
    token = jwt.decode(request.headers['Authorization'], secret, verify=True)
    userId = token['payload']['_id']
    code = request.json['code']
    form = {'grant_type': 'authorization_code',
            'code': code,
            'client_id': '77bf8547-6358-43aa-b5c3-7ec5c96022e3',
            'client_secret': 'DAI6X?YK6jGw/@4C8ECZmnRponXNUVW:'}
    r = requests.post(
        "https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/oauth2/v2.0/token", form)
    print(r.json(), file=sys.stderr)
    data = r.json()
    print(data['access_token'], file=sys.stderr)
    services = db.services
    service = services.find_one(
        {"serviceName": "office365", "userId": token['payload']['_id']})
    if service is None:
        new_service = services.insert_one(
            {"serviceName": "office365", "serviceToken": data['access_token'], "refresh_token": data['refresh_token'], "userId": userId}).inserted_id
        # print(new_user, file=sys.stderr)
        user_services = list(services.find(
            {"userId": token['payload']['_id']}))
        return Response(json.dumps(user_services, default=json_util.default), headers={'Content-Type': 'application/json'})
    services.find_one_and_update({"serviceName": "office365", "userId": token['payload']['_id']}, {
                                 "$set": {"serviceToken": data['access_token'], "refresh_token": data['refresh_token']}})
    return jsonify({'success': True, 'message': "Service updated"}), 200


@app.route('/api/update_officeToken', methods=['GET'])
def updateToken():
    token = jwt.decode(request.headers['Authorization'], secret, verify=True)
    services = db.services
    service = services.find_one(
        {"serviceName": "office365", "userId": token['payload']['_id']})
    userId = token['payload']['_id']
    form = {'grant_type': 'refresh_token',
            'refresh_token': service['refresh_token'],
            'client_id': '77bf8547-6358-43aa-b5c3-7ec5c96022e3',
            'client_secret': 'DAI6X?YK6jGw/@4C8ECZmnRponXNUVW:'}
    r = requests.post(
        "https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/oauth2/v2.0/token", form)
    data = r.json()
    services.find_one_and_update({"serviceName": "office365", "userId": token['payload']['_id']}, {
                                 "$set": {"serviceToken": data['access_token'], "refresh_token": data['refresh_token']}})
    return jsonify({'success': True, 'message': "Service updated"}), 200


@app.route('/api/epitech/<path>', methods=['GET'])
def epitechApi(path):
    print(path, file=sys.stderr)
    token = jwt.decode(request.headers['Authorization'], secret, verify=True)
    services = db.services
    service = services.find_one(
        {"serviceName": "epitech", "userId": token['payload']['_id']})
    r = requests.get("https://intra.epitech.eu/auth-" +
                     service['serviceToken'] + "/user/notification/" + path + "?format=json")
    print(r, file=sys.stderr)
    data = r.json()
    return jsonify({'success': True, 'alerts': data}), 200


@app.route('/api/epitech/user/', methods=['GET'])
def epitechUser():
    token = jwt.decode(request.headers['Authorization'], secret, verify=True)
    services = db.services
    service = services.find_one(
        {"serviceName": "epitech", "userId": token['payload']['_id']})
    r = requests.get("https://intra.epitech.eu/auth-" +
                     service['serviceToken'] + "/user/?format=json")
    data = r.json()
    print(data["login"], file=sys.stderr)
    r = requests.get("https://intra.epitech.eu/auth-" +
                     service['serviceToken'] + "/user/" + data["login"] + "/notes/" "?format=json")
    #print(a, file=sys.stderr)
    data = r.json()
    return jsonify({'success': True, 'user_data': data}), 200

# @app.route('/about.json', methos=['GET'])
@app.route('/<path:path>')
def catch_all(path):
    print("path" + path, file=sys.stderr)
    return send_from_directory(app.static_folder, "index.html")


@app.errorhandler(404)
def handle_404(e):
    if request.path.startswith("/api/"):
        return jsonify(message="Resource not found"), 404
    return send_from_directory(app.static_folder, "index.html")


@app.route('/about.json', methods=['GET'])
def about():
    json = {
        "customer": {
            "host": request.remote_addr
        },
        "server": {
            "current_time ": int(time.time()),
            "services": [{
                "name": "Epitech",
                "widgets": [{
                    "name": "alerts",
                    "description ": "Display user alerts",
                    "params": [{
                        "name": "user",
                        "type": "string"
                    },
                        {
                        "name": "scope",
                        "type": "string"
                    },
                    {
                        "name": "token",
                        "type": "string"
                    }]
                },
                {
                    "name": "modules",
                    "description": "Display grades of different modules",
                    "params": [
                    {
                        "name": "token",
                        "type": "string"
                    }]
                },
                {
                    "name": "notes",
                    "description": "Display notes of different projects",
                    "params": [{
                        "name": "module_code",
                        "type": "string"
                    }, {
                        "name": "token",
                        "type": "integer"
                    }]
                }]
            }, {
                "name": "Yammer",
                "widgets": [{
                    "name": "feed",
                    "description": "Display last X feed messages",
                    "params": [{
                        "name": "limit",
                        "type": "integer"
                    }, {
                        "name": "token",
                        "type": "string"
                    }]
                },
                {
                    "name": "threads",
                    "description": "Display last X message from Y thread",
                    "params": [{
                        "name": "limit",
                        "type": "integer"
                    },{
                        "name": "thread_id",
                        "type": "integer"
                    },{
                        "name": "token",
                        "type": "string"
                    }]
                },
                {
                    "name": "personnal_messages",
                    "description": "Display last X personnal messages",
                    "params": [{
                        "name": "limit",
                        "type": "integer"
                    }, {
                        "name": "token",
                        "type": "string"
                    }]
                }]
            },
            {"name": "Office365",
                "widgets": [{
                    "name": "shared_files",
                    "description": "Display shared files with connected user",
                    "params": [{
                        "name": "filter",
                        "type": "string"
                    }, {
                        "name": "token",
                        "type": "string"
                    }]
                },
                {
                    "name": "calendar",
                    "description": "Display events on calendar",
                    "params": [{
                        "name": "date",
                        "type": "date"
                    },{
                        "name": "token",
                        "type": "string"
                    }]
                },
                {
                    "name": "outlook_mails",
                    "description": "Display last X mails",
                    "params": [{
                        "name": "limit",
                        "type": "integer"
                    }, {
                        "name": "token",
                        "type": "string"
                    }]
                }]
            }]
        }
    }

    return jsonify(json), 200


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 80))
    app.run(host="0.0.0.0", debug=True, port=port)
