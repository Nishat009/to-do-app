import { useDrop } from 'react-dnd';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoColumn = ({ title, todos, addTodo, moveTodo, updateDueDate }) => {
  const [, drop] = useDrop({
    accept: 'TODO',
    drop: (item) => {
      moveTodo(item.id, title);
    },
  });

  return (
    <div ref={drop} className="flex-1 p-4 bg-gray-800 rounded m-2 h-max">
      <h2 className="text-xl font-bold mb-4 bg-gray-700 p-3 text-white rounded">{title}</h2>
      {title === 'New' && <TodoForm addTodo={addTodo} />}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          moveTodo={moveTodo}
          updateDueDate={updateDueDate}
        />
      ))}
    </div>
  );
};

export default TodoColumn;