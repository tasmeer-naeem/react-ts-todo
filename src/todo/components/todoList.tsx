import React from 'react'
import { useState } from "react";
import { todoType } from "../todo";
import TodoService from "../todoService";
import TodoForm from './todoForm';

const TodoList = () => {
  const [todos, setTodos] = useState<todoType[]>(TodoService.getTodos());
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleEditStart = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };
  const handleEditCancel = (id: number, text: string) => {
    setEditId(null);
    setEditText("");
  };
  const handleEditSave = (id: number) => {
    console.log(id)
    if (editText !== "") {
      try{
      const updateTodo = TodoService.updateTodo({
        id: id,
        text: editText,
        isCompleted: false,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          console.log(prevTodos,todo)
          return(    
          (todo.id === id ? updateTodo : todo)
         ) } )
      );
      console.log(setTodos)
      setEditId(null);
      setEditText("");
    }
    catch(err){
      console.log(err)
    }
    }
  };
  const handleDeleteItem = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-app">
      
      <div>
      <TodoForm setTodos={setTodos}/>
        {todos.map((item) => {
          return (
            <div key={item.id}>
              {editId === item.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => handleEditSave(item.id)}>update</button>
                  <button
                    onClick={() => handleEditCancel(item.id, item.text)}
                  >cancel</button>
                </>
              ) : (
                <>
                  <span>{item.text}</span>
                  <button
                    onClick={() => handleEditStart(item.id, item.text)}
                  >edit</button>
                </>
              )}
              <button onClick={() => handleDeleteItem(item.id)}>delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
