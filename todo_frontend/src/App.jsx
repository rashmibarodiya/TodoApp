import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 // const [count, setCount] = useState(0)
 const[todo, setTodo] = useState({
  title: 'honolulu',
  description: '|| chipkala',
  completed: false
 })

setTimeout(() =>{
  setTodo({
    title :  'aankhe hai bhool bholaiya',
    description  :'|| baate hai bhool bholaiya',
    completed : false})
  },5000)


  return (
    <>
      <h1>Title</h1>
      <input type="text" name="title"></input>
      <h1>Description</h1>
      <input type="text" name="description"></input>

      todo.title = tit
      {/* setTodo(){
        title : title,
        description  : description,
        completed : completed
      } */}
      {todo.description}

      <Try first = "first" second = "second"></Try>
    </>
  )
}


function Try({first, second}){
  return (
    <>
      <h1>hi there</h1>
      <h2>{first}</h2>
      <h2>{second}</h2>
    </>
  )
}
export default App
