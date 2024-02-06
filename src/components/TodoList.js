import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onDelete, onSave, onToggle }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onSave={onSave}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
