import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
function App() {
  // the varible we can change , and use in dom , known as state
  const [value, setValue] = useState(0);  //make new state named as value , which i can chnage using setvalue , where setvalueis function
  return (
    
    <div className="App">
    <Navbar logoText="my website"/>
      <div className='value'>{value}</div>
      <button onClick={() => { setValue(value + 1) }}>
        click me
      </button>

      <Footer/>
    </div>
  );
}

export default App;
