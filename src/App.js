import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import axios from "axios";
import nextId from "react-id-generator";

export default function App() {
  const idGenerator = () => {
    return nextId();
  };
  function getTodos() {
    axios
      .get("https://6317578082797be77ffa2125.mockapi.io/todos")
      .then((res) => {
        setTodos(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function postTodos(todo) {
    axios
      .post("https://6317578082797be77ffa2125.mockapi.io/todos", todo)
      .then((res) => {
        setTodos([...todos, res.data]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteTodos(id) {
    axios
      .delete(`https://6317578082797be77ffa2125.mockapi.io/todos/${id}`)
      .then((res) => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateTodos(todo) {
    axios
      .put(`https://6317578082797be77ffa2125.mockapi.io/todos/${todo.id}`, todo)
      .then((res) => {
        setTodos(
          todos.map((item) => {
            if (item.id === todo.id) {
              return {
                ...item,
                isCompleted: !item.isCompleted,
              };
            }
            return item;
          })
        );
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    filterHandler();
  }, [todos, filterStatus]);

  const filterHandler = () => {
    switch (filterStatus) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.isCompleted === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.isCompleted === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
    console.log(filteredTodos);
  };

  const handleSubmitTodo = (e) => {
    e.preventDefault();
    postTodos({
      content: todoInput,
      isCompleted: false,
      id: idGenerator(),
    });
    setTodoInput("");
  };

  const handleDeleteTodo = (id) => {
    deleteTodos(id);
  };
  return (
    <div className="App">
      <header>
        <h1>Gizem's Todo list</h1>
      </header>
      <Form
        todoInput={todoInput}
        setTodoInput={setTodoInput}
        setFilterStatus={setFilterStatus}
        handleSubmitTodo={handleSubmitTodo}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
        setFilteredTodos={setFilteredTodos}
        handleDeleteTodo={handleDeleteTodo}
        updateTodos={updateTodos}
      />
    </div>
  );
}
