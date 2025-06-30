
import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';

const TodoItem = ({ todo, moveTodo, updateDate }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: 'TODO',
    item: { id: todo.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const handleMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
  };
  const handleDate = (e) => {
    updateDate(todo.id, e.target.value);
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      const menuElement = document.querySelector('.context-menu');
      if (showMenu && menuElement && !menuElement.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);
  return (
    <div
      ref={drag}
      className={`rounded p-3 m-2 relative shadow cursor-move ${
        todo.status === 'New'
          ? 'bg-gradient-to-r from-purple-100 to-purple-200'
          : todo.status === 'Ongoing'
          ? 'bg-gradient-to-r from-[#f6df8d] to-[#fcca19] '
          : 'bg-gradient-to-r from-[#cbf8db] to-[#c4eed3]'
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
          className="absolute z-[9999] !top-20 !left-40 bg-white border rounded-sm shadow context-menu"
          onClick={(e) => {
            e.stopPropagation(); 
            if (!e.target.closest('.menu-option')) {
              setShowMenu(false);
            }
          }}
        >
          {option.map((status) => (
            <div
              key={status}
              className="px-4 py-2 hover:bg-[#dfdfdf] cursor-pointer menu-option"
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