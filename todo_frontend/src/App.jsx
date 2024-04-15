import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


//import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDesChange = (e) => {
    setDes(e.target.value);
  };

  const handleSubmit = () => {
    const newTodo = { title, des };
    setTodos([...todos, newTodo]);
    setTitle('');
    setDes('');
  };

  return (
    <div>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
      />
      <br />
      <label>Description:</label>
      <input
        type="text"
        value={des}
        onChange={handleDesChange}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <strong>{todo.title}</strong>: {todo.des}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
