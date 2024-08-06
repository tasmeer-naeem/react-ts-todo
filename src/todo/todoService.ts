import { todoType } from "./todo";

const LOCAL_STORAGE_KEY = 'todos'
const TodoService = {

    //get todo
    getTodos:() :todoType[] => {
        const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY)
        return todoStr ? JSON.parse(todoStr) : []
    },

    //add todo
    addTodo:(text:string) :todoType =>{
        const todos = TodoService.getTodos()
        const newTodo : todoType = {
            id:todos.length + 1,
            text,
            isCompleted:false
        }
        const updateTodoList = [...todos,newTodo]
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(updateTodoList))
        return newTodo
    },

    //update todo
    // updateTodo:(todo:todoType) :todoType=>{
    //     const todos = TodoService.getTodos()
    //     const updatedTodo = todos.map((item)=> item.id === todo.id)
    //     localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(updatedTodo))
    //     return todo   //  parameter todo
    // },
    updateTodo: (todo:todoType): todoType => {
        const todos = TodoService.getTodos();
        const updatedTodos = todos.map((item) => 
          item.id === todo?.id ? { ...item, ...todo } : item
        );
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
        
        // Return the updated todo item
        return todo //updatedTodos.find(item => item.id === todo?.id);
      },
      

    //delete todo
    deleteTodo:(id:number) =>{
        const todos = TodoService.getTodos()
        const delTodo = todos.filter((item) => item.id !== id)
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(delTodo))
    }
}

export default TodoService