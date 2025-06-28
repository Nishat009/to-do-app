import { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo({
        id: Date.now().toString(),
        title,
        description,
        status: 'New',
        dueDate: null,
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full p-2 mb-2 border border-[#2c2c2c] rounded text-sm bg-white"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="w-full p-2 mb-2 border border-[#2c2c2c] rounded text-sm bg-white"
      />
      <button type="submit" className="px-4 py-2 bg-[#2c2c2c] text-white cursor-pointer rounded text-xs">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;