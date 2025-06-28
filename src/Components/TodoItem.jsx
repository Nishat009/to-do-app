import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';

const TodoItem = ({ todo, moveTodo, updateDate }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menu, setMenu] = useState({ a: 0, b: 0 });
  const [{ isDragging }, drag] = useDrag({
    type: 'TODO',
    item: { id: todo.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const handleMenu = (event) => {
    event.preventDefault();
    setMenu({ a: event.clientX, b: event.clientY });
    setShowMenu(true);
  };
  const handleDate = (event) => {
    updateDate(todo.id, event.target.value);
  };
  useEffect(() => {
    if (todo.status === 'Ongoing' && todo.dueDate) {
      const checkDue = () => {
        if (new Date(todo.dueDate) < new Date()) {
          alert(`Task "${todo.title}" is overdue!`);
        }
      };
      const interval = setInterval(checkDue, 50000);
      return () => clearInterval(interval);
    }
  }, [todo.dueDate, todo.status, todo.title]);
  const option = ['New', 'Ongoing', 'Done'].filter((status) => status !== todo.status);

  return (
    <div
      ref={drag}
      className={`rounded p-3 m-2  shadow cursor-move ${
        todo.status === 'New'
          ? 'bg-[#f156ea2e] border-[#f156ea2e]'
          : todo.status === 'Ongoing'
          ? 'bg-[#fccb1946] border-[#fcca19] '
          : 'bg-[#cbf8db] border-[#c4eed3]'
      } ${isDragging ? 'opacity-50' : ''} transition-all duration-200 hover:shadow-md`}
      onContextMenu={handleMenu}
    >
      <h3 className="font-bold text-lg">{todo.title}</h3>
      <p className="text-gray-700">{todo.description}</p>
      {todo.status === 'Ongoing' && (
        <input
          type="datetime-local"
          defaultValue={todo.dueDate}
          onChange={handleDate}
          className="mt-2 p-1 border rounded w-full text-sm focus:outline-none focus:ring-orange-300"
        />
      )}
      {showMenu && (
        <div
          className="absolute bg-white border rounded-sm shadow"
          style={{ top: menu.y, left: menu.x }}
          onClick={() => setShowMenu(false)}
        >
          {option.map((status) => (
            <div
              key={status}
              className="px-4 py-2 hover:bg-[#dfdfdf] cursor-pointer"
              onClick={() => {
                moveTodo(todo.id, status);
                setShowMenu(false);
              }}
            >
              Move to {status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoItem;