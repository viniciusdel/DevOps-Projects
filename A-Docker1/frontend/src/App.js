import React, { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch('http://api:3000/todos')
      .then(res => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    const res = await fetch('http://api:3000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false })
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTitle('');
  };

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ul>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

export default App;