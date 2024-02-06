import React, { useState } from 'react';

const Todo = ({ todo, onDelete, onSave, onToggle }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo.title);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onSave(todo.id, editedTodo);
    setEditing(false);
  };

  const handleCheckboxChange = () => {
    onToggle(todo.id);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleCheckboxChange}
        readOnly
      />
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTodo}
            onChange={(e) => setEditedTodo(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <span>{todo.title}</span>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => onDelete(todo.id)} disabled={todo.completed}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
