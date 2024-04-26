import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TextField } from "@mui/material/";
import Button from "@mui/material/Button";
import "./Todo.css";

const capitalize = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const Todo = () => {
  const [todos, setTodos] = useState([
    {
      task: "sample task",
      id: uuidv4(),
      isDone: false,
    },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoValue, setEditedTodoValue] = useState("");
  let addNewTask = () => {
    newTodo &&
      setTodos([...todos, { task: newTodo, id: uuidv4(), isDone: false }]);
    setNewTodo("");
  };
  let updateTask = (e) => {
    setNewTodo(e.target.value);
  };

  let deleteTodo = (id) => {
    setTodos(() => todos.filter((prevTodo) => prevTodo.id !== id));
    // setTodos((prevTodo) => todos.filter((prevTodo) => prevTodo.id !== id));
  };
  let updateOneTodo = (id, newTask) => {
    setTodos((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            task: newTask,
            isDone: false,
          };
        } else {
          return todo;
        }
      });
    });
    setEditingTodoId(null);
  };
  let hanldeDoneOneTask = (id) => {
    setTodos((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            task: capitalize(todo.task),

            isDone: true,
          };
        } else {
          return todo;
        }
      });
    });
  };

  let startEditingTodo = (id, task) => {
    setEditingTodoId(id);
    setEditedTodoValue(task);
    console.log("heelo", id);
  };
  let handleEditedTodoChange = (e) => {
    setEditedTodoValue(e.target.value);
  };
  let handleEditTodoSubmit = (id) => {
    editedTodoValue && updateOneTodo(id, editedTodoValue);
  };
  return (
    <div className="todo flex flex-col gap-5">
      <div className="py-5 input w-[50vw] h-[100%]  m-auto whitespace-nowrap flex align-center justify-center sm-w-[2000px]">
        <TextField
          required
          id="outlined-basic"
          label="Enter your task"
          variant="outlined"
          type="text"
          value={newTodo}
          onChange={updateTask}
          size="small"
          max={5}
          className="w-[100%] "
          InputLabelProps={{
            style: { color: "#dda15e" }, // Change the color here
          }}
        />

        <Button
          className="button"
          variant="contained"
          size="small"
          onClick={addNewTask}
          style={{
            backgroundColor: "#bc6c25",
          }}
        >
          Add Task
        </Button>
      </div>
      <hr />
      <div className="contain">
        <h4>
          <b>Tasks Added</b>
        </h4>
        <ul className="listContent flex flex-col gap-5">
          {todos.map((todo, index) => (
            <li
              className="list bg-[#606c38] flex align-center justify-between px-5 py-2 rounded-lg text-[#fefae0]"
              key={todo.id}
            >
              {editingTodoId === todo.id ? (
                <>
                  <TextField
                    id="outlined-basic"
                    label="Enter your task"
                    variant="outlined"
                    type="text"
                    value={editedTodoValue}
                    onChange={handleEditedTodoChange}
                    size="small"
                    className="bg-[#dda15e] "
                    InputLabelProps={{
                      style: { color: "white" }, // Change the color here
                    }}
                  />
                  <Button
                    className="button"
                    style={{
                      backgroundColor: "#283618",
                    }}
                    variant="contained"
                    size="small"
                    onClick={() => handleEditTodoSubmit(todo.id)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <span
                    className="textContent"
                    style={
                      !editingTodoId
                        ? todo.isDone
                          ? { textDecoration: "line-through" }
                          : {}
                        : {}
                    }
                  >
                    <span className="increseNumber bg-[#283618] rounded-full text-white px-2 py-1 text-center mx-2">
                      {index + 1}
                    </span>
                    {todo.task}
                  </span>
                  <div className="buttonContent flex align-center justify-center gap-5 ">
                    <Button
                      className="button"
                      style={{
                        backgroundColor: "#283618",
                      }}
                      variant="contained"
                      size="small"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </Button>

                    <Button
                      className="button"
                      style={{
                        backgroundColor: "#283618",
                      }}
                      variant="contained"
                      size="small"
                      onClick={() => startEditingTodo(todo.id, todo.task)}
                    >
                      Update
                    </Button>

                    <Button
                      className="done"
                      style={{
                        backgroundColor: "#283618",
                      }}
                      variant="contained"
                      size="small"
                      onClick={() => hanldeDoneOneTask(todo.id)}
                    >
                      Done
                    </Button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
