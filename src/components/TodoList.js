import Todo from "./Todo";

function TodoList({
  todos,
  setTodos,
  filteredTodos,
  handleDeleteTodo,
  updateTodos,
}) {
  return (
    <div className="todo-list">
      <ul className="todo-items">
        {filteredTodos.map((todo) => (
          <Todo
            todos={todos}
            setTodos={setTodos}
            text={todo.content}
            key={todo.id}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            updateTodos={updateTodos}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
