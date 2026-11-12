import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [card, setcard] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      let a = await fetch('https://jsonplaceholder.typicode.com/todos');
      let data = await a.json();
      setcard(data);   // ✅ data is already an array
      console.log(data);
    };
    fetchdata();
  }, []);

  return (
    <>
      <div className="container">
        {card.map((todo) => (
          <div className="card" key={todo.id}>
            <h2>{todo.title}</h2>
            <p>User ID: {todo.userId}</p>
            <p>Completed: {todo.completed ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;