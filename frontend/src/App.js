import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import CountView from './CountView';

function App() {
  /* === State === */
  const [data, setData] = useState(1234)
  const [bgColor, setBgColor] = useState('blue')
  const [count, setCount] = useState(0)

  
  /* === Function === */
  const handleChangeColor = () => {
    setBgColor('red')
  }

  const handleCalc = (type)=>{
    if(type === '+') setCount(count + 1)
    else setCount(count - 1)
  }

  useEffect(()=>{
    if(count >= 20){
      setBgColor('green');
    }else if(count >= 10){
      setBgColor('red');
    }else{
      setBgColor('blue');
    }

  }, [count])
  
  /* === View === */
  return (
    <div  style={{background:bgColor}}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <CountView 
          count={count} 
          handleChangeColor={handleChangeColor}
          handleCalc={handleCalc}
        >  
        </CountView>
        
        
      </header>
    </div>
  );
}

export default App;
