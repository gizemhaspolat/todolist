import nextId from "react-id-generator";

function Form({ todoInput, setTodoInput, todos, setTodos, setFilterStatus }) {
  const inputId = nextId();

  const getTodoInput = (e) => {
    console.log(e.target.value);
    setTodoInput(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        text: todoInput,
        completed: false,
        id: inputId,
      },
    ]);
    setTodoInput("");
  };

  const filterStatus = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <form>
      <input
        onChange={getTodoInput}
        type="text"
        className="todo-input"
        value={todoInput}
      />
      <button onClick={addTodo} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={filterStatus} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
}

export default Form;
