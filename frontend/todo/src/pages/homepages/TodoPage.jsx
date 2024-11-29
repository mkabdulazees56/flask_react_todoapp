import React, { useState, useEffect } from "react";
import { getAllTodos, updateTodo } from "../../services/TodoServices";
import { addTodo } from "../../services/TodoServices";
import { markasCompletedDb } from "../../services/TodoServices";
import { deleteTodo } from "../../services/TodoServices";
import { currentuser } from "../../services/AuthService";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Container, Box, Grid, Typography, TextField, Button, Paper, Card, IconButton } from "@mui/material";
import { Edit, Delete, CheckCircle, Undo } from "@mui/icons-material";

export default function TodoPage() {
  const [todos, setTodo] = useState([]);
  const [task, setTask] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
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

    const getCurrent = () => {
      const user = currentuser();
      if (user !== null) {
        setCurrentUser(user);
      }
    };

    getCurrent();
    fetchTodos();
  }, []);

  const todoSubmit = async () => {
    if (task.trim() !== "") {
      const id = uuidv4();
      const newTodo = {
        task,
        deleted: false,
        user_id: "",
        todo_id: id,
        completed: false,
        created_at: new Date().toISOString(),
      };

      try {
        setTodo([...todos, newTodo]);
        await addTodo(newTodo);
        setTask(""); // Clear the input field after submission
      } catch (error) {
        toast.error("Error adding todo");
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

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setTask(todo.task); // Pre-fill the task input with the existing todo text
  };

  const handleEditDb = async () => {
    if (task.trim() !== "") {
      const updatedTodo = { ...editTodo, task };
      setTodo((prev) =>
        prev.map((todo) => (todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo))
      );

      try {
        await updateTodo(updatedTodo.task, updatedTodo.todo_id);
        setEditTodo(null);
        setTask("");
        toast.success("Todo updated successfully");
      } catch (error) {
        toast.error("Error updating todo");
      }
    } else {
      toast.error("Please enter a task");
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#e8f5e9", // Light green background
        color: "#212121",
        padding: 3,
        display: "flex",
        flexDirection: "column", // Ensure the layout is vertical on mobile
      }}
    >
      {/* Welcome Message */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h5" color="#388e3c">
          {currentUser ? `Welcome, ${currentUser}` : "Welcome!"}
        </Typography>
      </Box>

      {/* Todo Form */}
      <Box sx={{ marginBottom: 3 }}>
        <Card sx={{ padding: 3, boxShadow: 3, backgroundColor: "#ffffff" }}>
          <Typography variant="h6" fontWeight="bold" mb={2} color="#388e3c">
            {editTodo ? "Edit Todo" : "Add a New Todo"}
          </Typography>
          <TextField
            label="Task"
            variant="outlined"
            fullWidth
            value={task}
            onChange={(e) => setTask(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="success"
            onClick={editTodo ? handleEditDb : todoSubmit}
            fullWidth
            sx={{
              fontWeight: "bold",
              backgroundColor: "#388e3c", // Primary green color
              "&:hover": {
                backgroundColor: "#1b5e20", // Darker shade on hover
              },
            }}
          >
            {editTodo ? "Save Changes" : "Add Todo"}
          </Button>
        </Card>
      </Box>

      {/* Todo List */}
      <Box>
        {todos.length > 0 ? (
          <Grid container spacing={2}>
            {todos.map((todo, index) => (
              <Grid item xs={12} sm={6} md={4} key={todo.todo_id}> {/* Full width on mobile, 2 columns on small screens and 3 columns on medium screens */}
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    backgroundColor: todo.completed ? "#c8e6c9" : "#ffffff", // Greenish for completed
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    height: "150px",
                    "&:hover": {
                      backgroundColor: "#f1f8e9", // Hover effect
                      cursor: "pointer",
                    },
                  }}
                >
                  <Box>
                    <Typography variant="body1" color="#212121" sx={{ marginBottom: "auto" }}>
                      {todo.task}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                    <IconButton onClick={() => markasCompleted(index)} sx={{ "&:hover": { color: "#388e3c" } }}>
                      {todo.completed ? <Undo /> : <CheckCircle />}
                    </IconButton>
                    <IconButton onClick={() => handleEdit(todo)} sx={{ "&:hover": { color: "#388e3c" } }}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index)} sx={{ "&:hover": { color: "#d32f2f" } }}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" color="textSecondary" textAlign="center" sx={{ padding: 5 }}>
            No todos yet. Add a new task!
          </Typography>
        )}
      </Box>
    </Container>
  );
}
