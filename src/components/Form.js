function Form({ todoInput, setTodoInput, setFilterStatus, handleSubmitTodo }) {
  const getTodoInput = (e) => {
    setTodoInput(e.target.value);
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
      <button onClick={handleSubmitTodo} className="todo-button" type="submit">
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
