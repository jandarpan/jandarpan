from werkzeug.security import generate_password_hash
import sqlite3
from pathlib import Path
from datetime import datetime

BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / "jandarpan.db"

full_name = input("Admin name: ").strip()
email = input("Admin email: ").strip().lower()
mobile = input("Admin mobile: ").strip()
password = input("Admin password: ")

connection = sqlite3.connect(DATABASE)

existing_user = connection.execute(
    "SELECT id FROM users WHERE email = ?",
    (email,)
).fetchone()

if existing_user:
    print("This email already exists.")
    connection.close()
    exit()

password_hash = generate_password_hash(password)

connection.execute("""
    INSERT INTO users
    (full_name, email, mobile, password_hash, role, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
""", (
    full_name,
    email,
    mobile,
    password_hash,
    "admin",
    datetime.now().isoformat(timespec="seconds")
))

connection.commit()
connection.close()

print("Admin account created successfully!")