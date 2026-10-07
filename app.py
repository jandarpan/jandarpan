from flask import Flask, request, jsonify, session, send_from_directory
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
from pathlib import Path
from datetime import datetime
import os

app = Flask(__name__)

# Session ke liye secret key
app.secret_key = "jandarpan-dev-secret-change-later"

# Database file
BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / "jandarpan.db"


# ---------------- DATABASE ----------------

def get_db():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    connection = get_db()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            mobile TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user',
            created_at TEXT NOT NULL,
            last_login TEXT
        )
    """)

    connection.commit()
    connection.close()


init_db()

def bootstrap_admin():
    admin_email = os.getenv("ADMIN_EMAIL")
    admin_password = os.getenv("ADMIN_PASSWORD")

    if not admin_email or not admin_password:
        return

    admin_email = admin_email.strip().lower()

    connection = get_db()

    existing_user = connection.execute(
        "SELECT id FROM users WHERE email = ?",
        (admin_email,)
    ).fetchone()

    password_hash = generate_password_hash(admin_password)

    if existing_user:
        connection.execute(
            """
            UPDATE users
            SET role = 'admin',
                password_hash = ?
            WHERE id = ?
            """,
            (password_hash, existing_user["id"])
        )
    else:
        connection.execute(
            """
            INSERT INTO users
            (full_name, email, mobile, password_hash, role, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                "JanDarpan Admin",
                admin_email,
                "0000000000",
                password_hash,
                "admin",
                datetime.now().isoformat(timespec="seconds")
            )
        )

    connection.commit()
    connection.close()


bootstrap_admin()
# ---------------- SIGNUP ----------------

@app.route("/api/signup", methods=["POST"])
def signup():

    data = request.get_json()

    full_name = data.get("full_name", "").strip()
    email = data.get("email", "").strip().lower()
    mobile = data.get("mobile", "").strip()
    password = data.get("password", "")

    if not full_name or not email or not mobile or not password:
        return jsonify({
            "success": False,
            "message": "All fields are required."
        }), 400

    connection = get_db()

    existing_user = connection.execute(
        "SELECT id FROM users WHERE email = ?",
        (email,)
    ).fetchone()

    if existing_user:
        connection.close()

        return jsonify({
            "success": False,
            "message": "An account with this email already exists."
        }), 409

    password_hash = generate_password_hash(password)

    created_at = datetime.now().isoformat(timespec="seconds")

    connection.execute("""
        INSERT INTO users
        (full_name, email, mobile, password_hash, role, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        full_name,
        email,
        mobile,
        password_hash,
        "user",
        created_at
    ))

    connection.commit()
    connection.close()

    return jsonify({
        "success": True,
        "message": "Account created successfully."
    })


# ---------------- LOGIN ----------------

@app.route("/api/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required."
        }), 400

    connection = get_db()

    user = connection.execute(
        "SELECT * FROM users WHERE email = ?",
        (email,)
    ).fetchone()

    if not user:
        connection.close()

        return jsonify({
            "success": False,
            "message": "Invalid email or password."
        }), 401

    if not check_password_hash(user["password_hash"], password):
        connection.close()

        return jsonify({
            "success": False,
            "message": "Invalid email or password."
        }), 401
    last_login = datetime.now().isoformat(timespec="seconds")

    connection.execute(
        "UPDATE users SET last_login = ? WHERE id = ?",
        (last_login, user["id"])
    )

    connection.commit()
    connection.close()

    session["user_id"] = user["id"]

    return jsonify({
        "success": True,
        "message": "Login successful.",
        "user": {
            "id": user["id"],
            "name": user["full_name"],
            "email": user["email"],
            "role": user["role"]
        }
    })


# ---------------- CURRENT USER ----------------

@app.route("/api/me", methods=["GET"])
def current_user():

    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            "logged_in": False
        })

    connection = get_db()

    user = connection.execute(
        """
        SELECT id, full_name, email, mobile, role, created_at, last_login
        FROM users
        WHERE id = ?
        """,
        (user_id,)
    ).fetchone()

    connection.close()

    if not user:
        session.clear()

        return jsonify({
            "logged_in": False
        })

    return jsonify({
        "logged_in": True,
        "user": dict(user)
    })


# ---------------- LOGOUT ----------------

@app.route("/api/logout", methods=["POST"])
def logout():

    session.clear()

    return jsonify({
        "success": True,
        "message": "Logged out successfully."
    })







# ---------------- ADMIN USERS ----------------

@app.route("/api/admin/users", methods=["GET"])
def admin_users():

    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            "success": False,
            "message": "Login required."
        }), 401

    connection = get_db()

    current_user = connection.execute(
        "SELECT role FROM users WHERE id = ?",
        (user_id,)
    ).fetchone()

    if not current_user or current_user["role"] != "admin":
        connection.close()

        return jsonify({
            "success": False,
            "message": "Admin access required."
        }), 403

    users = connection.execute("""
        SELECT
            id,
            full_name,
            email,
            mobile,
            role,
            created_at,
            last_login
        FROM users
        ORDER BY id DESC
    """).fetchall()

    connection.close()

    return jsonify({
        "success": True,
        "users": [dict(user) for user in users]
    })

# ---------------- ADMIN PAGE ----------------

@app.route("/admin.html")
def admin_page():

    user_id = session.get("user_id")

    if not user_id:
        return "Admin login required.", 401

    connection = get_db()

    user = connection.execute(
        "SELECT role FROM users WHERE id = ?",
        (user_id,)
    ).fetchone()

    connection.close()

    if not user or user["role"] != "admin":
        return "Access denied. Admins only.", 403

    return send_from_directory(BASE_DIR, "admin.html")
# ---------------- WEBSITE ----------------

@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/<path:filename>")
def website_files(filename):

    allowed_extensions = (
        ".html",
        ".css",
        ".js",
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
        ".mp4"
    )

    if not filename.lower().endswith(allowed_extensions):
        return "File not found", 404

    return send_from_directory(BASE_DIR, filename)


# ---------------- START ----------------

if __name__ == "__main__":
    init_db()

    print("JanDarpan server starting...")
    print("Open: http://127.0.0.1:5000")

    app.run(debug=True)