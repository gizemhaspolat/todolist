import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import axios from "axios";

export default function App() {
  useEffect(() => {
    getLocalTodos();
  }, []);

  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const filterTodos = () => {
    switch (filterStatus) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  useEffect(() => {
    axios
      .get(`https://6317578082797be77ffa2125.mockapi.io/todos`)
      .then((res) => {
        setTodos(res.data);
      });
    console.table(setTodos);
    filterTodos();
    saveLocalTodos();
  }, [todos, filterStatus]);

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Gizem's Todo list</h1>
      </header>
      <Form
        todoInput={todoInput}
        setTodoInput={setTodoInput}
        todos={todos}
        setTodos={setTodos}
        setFilterStatus={setFilterStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}
