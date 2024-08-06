import React from 'react';
import './App.css';
import TodoList from './todo/components/todoList';

function App() {
  return (
    <div className="App">
      <div className="todo-app">
          Learn React  
          <TodoList/> 
      </div>
    </div>
  );
}

export default App;
