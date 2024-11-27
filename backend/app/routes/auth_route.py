from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import create_access_token
from app.models.user import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    existinguser = User.get_user_by_username(username)
    if existinguser:
        return jsonify({"message": "User already exists"}), 400
    
    hashed_password = generate_password_hash(password)

    User.create_user(username, hashed_password)

    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)

    username = data.get("username")
    password = data.get("password")

    user = User.get_user_by_username(username)
    print(user)
    if not user:
        return jsonify({"message": "User not found"}), 401

    ispasswordmatched = User.check_password(username, password)
    print(ispasswordmatched)
    if not ispasswordmatched:
        return jsonify({"message": "Invalid password"}), 401
    
    access_token = create_access_token(identity=str(user["_id"]))

    return jsonify({"access_token": access_token}), 200
        