export default function Todo({ text, todo, handleDeleteTodo, updateTodos }) {
  const deleteTodo = () => {
    handleDeleteTodo(todo.id);
  };
  const completeTodo = () => {
    updateTodos(todo);
  };

  return (
    <div className="todo">
      <li className={`todo-item ${todo.isCompleted ? "completed" : ""}`}>
        {text}
      </li>
      <button onClick={completeTodo} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteTodo} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}
