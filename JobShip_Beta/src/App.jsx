import './App.css'
import { useState } from 'react';
import Todolist from './Todolist'

function App() {
  const [todos, setTodos] = useState(["Todo1", "Todo2"]);

  return (
    <div className="App">
      <Todolist todos = {todos}/>
      <input type={"text"}/>
      <button>add task</button>
      <button>delete task</button>
      <div>0 tasks is here</div>
    </div>
  )
}

export default App
