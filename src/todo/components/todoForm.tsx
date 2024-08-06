import React, { useState ,  Dispatch , SetStateAction  } from 'react'
import TodoService from '../todoService'
import { todoType } from '../todo'

interface PropTypes{
    setTodos : Dispatch<SetStateAction<todoType[]>>
}

const TodoForm:React.FC<PropTypes> = ({setTodos}) => {

const [newTodo , setNewTodo] = useState<string>("")

const handleAddTodo = () => {
    const addTodo = TodoService.addTodo(newTodo)
    setTodos((prevTodos)=> [...prevTodos,addTodo])
    setNewTodo("")
}
  return (
    <div>
        <input type="text" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)}/>
        <button onClick={()=>handleAddTodo()}>add</button>
    </div>
  )
}

export default TodoForm