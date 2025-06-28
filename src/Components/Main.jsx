import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TodoColumn from './TodoColumn';

const Main = () => {
  const [todos, setTodos] = useState([]);
  const [columnTitles, setColumnTitles] = useState({
    New: 'New',
    Ongoing: 'Ongoing',
    Done: 'Done',
  });

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const moveTodo = (id, newStatus) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const updateDueDate = (id, value) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? typeof value === 'string'
            ? { ...todo, dueDate: value }
            : { ...todo, ...value }
          : todo
      )
    );
  };

  const updateColumnTitle = (oldTitle, newTitle) => {
    setColumnTitles((prev) => ({
      ...prev,
      [newTitle]: prev[oldTitle],
      ...Object.fromEntries(
        Object.entries(prev)
          .filter(([key]) => key !== oldTitle)
          .map(([key, value]) => [key === oldTitle ? newTitle : key, value])
      ),
    }));
    setTodos(
      todos.map((todo) =>
        todo.status === oldTitle ? { ...todo, status: newTitle } : todo
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="header">
        <h1>Todo List App</h1>
      </div>
      <div className="container">
        <div className="flex flex-col md:flex-row gap-6">
          <TodoColumn
            title={columnTitles.New}
            todos={todos.filter((todo) => todo.status === columnTitles.New)}
            addTodo={addTodo}
            moveTodo={moveTodo}
            updateDueDate={updateDueDate}
            updateColumnTitle={updateColumnTitle}
          />
          <TodoColumn
            title={columnTitles.Ongoing}
            todos={todos.filter((todo) => todo.status === columnTitles.Ongoing)}
            moveTodo={moveTodo}
            updateDueDate={updateDueDate}
            updateColumnTitle={updateColumnTitle}
          />
          <TodoColumn
            title={columnTitles.Done}
            todos={todos.filter((todo) => todo.status === columnTitles.Done)}
            moveTodo={moveTodo}
            updateDueDate={updateDueDate}
            updateColumnTitle={updateColumnTitle}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default Main;