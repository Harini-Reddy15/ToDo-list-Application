from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Enable CORS so frontend can call APIs

# Homepage route
@app.route('/')
def home():
    return render_template('index.html')
# Database setup
def init_db():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS tasks
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  title TEXT,
                  description TEXT,
                  deadline TEXT,
                  completed INTEGER)''')
    conn.commit()
    conn.close()

init_db()

# Fetch all tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("SELECT * FROM tasks")
    rows = c.fetchall()
    conn.close()
    tasks = [{"id": row[0], "title": row[1], "description": row[2], "deadline": row[3], "completed": bool(row[4])} for row in rows]
    return jsonify(tasks)

# Add a new task
@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("INSERT INTO tasks (title, description, deadline, completed) VALUES (?, ?, ?, ?)",
              (data['title'], data['description'], data['deadline'], 0))
    conn.commit()
    conn.close()
    return jsonify({"message": "Task added successfully"}), 201

# Update a task
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("UPDATE tasks SET title=?, description=?, deadline=?, completed=? WHERE id=?",
              (data['title'], data['description'], data['deadline'], int(data['completed']), task_id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Task updated successfully"})

# Delete a task
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("DELETE FROM tasks WHERE id=?", (task_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Task deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True)
