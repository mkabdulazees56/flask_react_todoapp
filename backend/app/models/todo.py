from flask import current_app  
from datetime import datetime

class Todo:
    def __init__(self, task, user_id):
        self.task = task
        self.user_id = user_id
        self.completed = False
        self.created_at = datetime.now()

    @classmethod
    def create_todo(cls, task, user_id, created_at= False):
        try:
            results = current_app.db.todos.insert_one({"task": task, "user_id": user_id, "completed": created_at, "created_at": datetime.now()})
            return results
        except Exception as e:
            print(f"Error creating todo: {e}")
            return None

    @classmethod
    def get_todos(cls, user_id):
        try:
            return current_app.db.todos.find({"user_id": user_id})
        except Exception as e:
            print(f"Error fetching todos: {e}")
            return None

    @classmethod
    def update_todo(cls, task, todo_id):
        try:
            results = current_app.db.todos.update_one({"_id": todo_id}, {"$set": {"task": task}})
            return results
        except Exception as e:
            print(f"Error updating todo: {e}")
            return None
    
    @classmethod
    def mark_as_completed(cls, todo_id, completed):
        try:
            results = current_app.db.todos.update_one({"_id": todo_id}, {"$set": {"completed": completed}})
            return results
        except Exception as e:
            print(f"Error updating todo: {e}")
            return None
        
    @classmethod
    def delete_todo(cls, todo_Id):
        try:
            results = current_app.db.todos.delete_one({"_id": todo_Id})
            return results
        except Exception as e:
            print(f"Error deleting todo: {e}")
            return None