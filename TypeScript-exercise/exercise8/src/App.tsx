import { useEffect, useState } from 'react'

interface User{
  username:string;
  email:string

}

type Todo = {
  id:number,
  task:string,
  isDone:boolean
}

function App() {
  const [count, setCount] = useState<number>(0)
  const [user,setUser] = useState<User | null>(null)
  const [todos,setTodos] = useState<Todo[]>([])

  useEffect(()=>{
    setUser({username:"Abdi",email:"abdi@gmail.com"})
  },[])
  
  return (
    <>
    <p>Count : {count}</p>
    <button onClick={() => setCount(count - 1)}>Decrement</button>
    <button  onClick={() => setCount(count + 1)}>Increment</button>

    {user &&  <p>{user.username} - {user.email} </p>}
    <button onClick={() => setTodos([...todos,{id:1,task:"solve exercise",isDone:false}])}>Add Task</button>
    { todos.length > 0 && 
    todos.map(todo =>(
      <div key={todo.id}>
        <p>{todo.task} - {todo.isDone ? "done" : "pending"}</p>
      </div>
    ))
      }
    </>
  )
}

export default App
