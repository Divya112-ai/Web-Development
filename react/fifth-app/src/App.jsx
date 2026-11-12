import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const read = () => {
    alert("hello world");
  };

  return (
    <>
      <div className="container">
        <button onClick={read}>click me</button>
      </div>
    </>
  );
}

export default App;