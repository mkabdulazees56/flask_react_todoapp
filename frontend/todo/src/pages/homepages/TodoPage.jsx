import { useState, useEffect } from "react";
import { getAllTodos, updateTodo, addTodo, markasCompletedDb, deleteTodo } from "../../services/TodoServices";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Button, Container, Grid, Typography, TextField, Checkbox, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function TodoPage() {
  const [todos, setTodo] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [user, setUser] = useState(""); // To store the logged-in user

  useEffect(() => {
    // Fetch logged-in user data (example: from localStorage, context, or API)
    const loggedInUser = localStorage.getItem("user") || "Guest"; // Adjust as per your authentication method
    setUser(loggedInUser);

    const fetchTodos = async () => {
      try {
        const todos = await getAllTodos();
        const todoList = todos.todo_list.map((todo) => ({
          todo_id: todo.todo_id,
          task: todo.task,
          user_id: todo.user_id,
          completed: todo.completed,
          created_at: todo.created_at,
        }));
        setTodo(todoList);
        toast.success("Todos fetched successfully");
      } catch (error) {
        toast.error("Error fetching todos");
      }
    };

    fetchTodos();
  }, []);

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddOrUpdateTask = async () => {
    if (newTask.trim() !== "") {
      if (isEditing) {
        const updatedTodo = {
          task: newTask,
          deleted: false,
          user_id: "",
          todo_id: currentTaskId,
          completed: false,
          created_at: new Date().toISOString(),
        };
        try {
          setTodo((prev) =>
            prev.map((todo) =>
              todo.todo_id === currentTaskId ? { ...todo, task: newTask } : todo
            )
          );
          await updateTodo(newTask, currentTaskId);
          setIsEditing(false);
          setNewTask("");
        } catch (error) {
          toast.error("Error updating todo");
        }
      } else {
        const id = uuidv4();
        const newtodo = {
          task: newTask,
          deleted: false,
          user_id: "",
          todo_id: id,
          completed: false,
          created_at: new Date().toISOString(),
        };
        try {
          setTodo([...todos, newtodo]);
          await addTodo(newtodo);
          setNewTask("");
        } catch (error) {
          toast.error("Error adding todo");
        }
      }
    } else {
      toast.error("Please enter a task");
    }
  };

  const markasCompleted = (index) => {
    setTodo((prev) =>
      prev.map((todo, i) => {
        if (i === index) {
          handleCompleted(todo.todo_id, !todo.completed);
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleCompleted = async (todo_id, isCompleted) => {
    try {
      await markasCompletedDb(todo_id, isCompleted);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = (index) => {
    setTodo((prev) => {
      const todoToDelete = prev[index];
      if (todoToDelete) {
        handleDeleteDb(todoToDelete.todo_id);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDeleteDb = async (todo_id) => {
    try {
      const response = await deleteTodo(todo_id);
      toast.success(response.message);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEdit = (index) => {
    const todoedit = todos[index];
    setNewTask(todoedit.task);
    setIsEditing(true);
    setCurrentTaskId(todoedit.todo_id);
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: 3 }}>
      <Typography variant="h3" gutterBottom color="primary" sx={{ fontWeight: "bold", textAlign: "center" }}>
        Todo List
      </Typography>
      
      {/* Display logged-in user */}
      <Typography variant="h6" color="textSecondary" sx={{ textAlign: "center", marginBottom: 3 }}>
        Welcome, {user}
      </Typography>

      {/* Task Input Section */}
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={10}>
          <TextField
            fullWidth
            label={isEditing ? "Edit Task" : "Add a new task"}
            variant="outlined"
            value={newTask}
            onChange={handleTaskChange}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleAddOrUpdateTask}
            sx={{ height: "100%" }}
          >
            {isEditing ? "Update Task" : "Add Task"}
          </Button>
        </Grid>
      </Grid>

      {/* Todo List Section */}
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <Grid item xs={12} key={todo.todo_id}>
              <Grid container spacing={2} alignItems="center" sx={{ backgroundColor: todo.completed ? "#e0f7fa" : "#ffffff", padding: 2, borderRadius: 2 }}>
                <Grid item xs={1}>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => markasCompleted(index)}
                    color="success"
                    sx={{ padding: 0 }}
                  />
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1" sx={{ textDecoration: todo.completed ? "line-through" : "none", color: todo.completed ? "#b0bec5" : "inherit" }}>
                    {todo.task}
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right" }}>
                  <IconButton onClick={() => handleEdit(index)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary" align="center" sx={{ width: "100%", marginTop: 2 }}>
            No tasks available. Add a task to get started!
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
