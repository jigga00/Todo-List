import React, { useReducer, useState } from 'react';
import TodoList from './components/TodoList';
import initialState from './data/todosData';
import { produce } from 'immer';

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_TODO':
      return produce(state, (draftState) => {
        const todo = draftState.find((t) => t.id === action.payload);
        if (todo) {
          todo.completed = !todo.completed;
        }
      });
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    case 'ADD_TODO':
      return [action.payload, ...state];
    default:
      return state;
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(todosReducer, initialState);
  const [newTodo, setNewTodo] = useState('');

  const handleToggle = (todoId) => {
    dispatch({ type: 'TOGGLE_TODO', payload: todoId });
  };

  const handleSave = (id, editedTodo) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, editedTodo } });
  };

  const handleDelete = (todoId) => {
    dispatch({ type: 'DELETE_TODO', payload: todoId });
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        userId: 1,
        id: todos.length + 1,
        title: newTodo,
        completed: false,
      };
      dispatch({ type: 'ADD_TODO', payload: newTodoItem });
      setNewTodo('');
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <TodoList todos={todos} onDelete={handleDelete} onSave={handleSave} onToggle={handleToggle} />
    </div>
  );
};

export default App;