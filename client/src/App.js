import './App.css';
import React, { useState, useId } from 'react';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [revalue, setRevalue] = useState("");
  const [tick, setTick] = useState(true);
  const [value, setValue] = useState("");
  const layout = {
    id : String,
    value : "",
    tick : Number,
    counter : Number
  };
  const [todo, setTodo] = useState([layout]);
  

  function HandleAdd(e) {
    e.preventDefault();
    const new_id = crypto.randomUUID();
    setTodo(todo => [...todo, {id : new_id, value: value, tick : 0, counter : 0}]);
    setValue("");
    console.log(todo);
  }

  return (
    <div className="App">
      <header className="App-header">
       To-do list
      </header>
      <ul className='App-list'>
        {todo.map((x, key)=> { 
          if(x.counter === 0 ) {
              return <li key={key}>
                <input type='checkbox' checked={x.tick}  onChange={(e) => { x.tick =  1; x.counter = 1; setTick(!tick);}} />
                 {x.value} 
                <button onClick={(e) => { x.counter = 2; setTick((!tick));}}>
                  Edit
                </button>
                <button onClick={(e) => {x.counter = 3; setTick(!tick);}}>
                  Deleted
                </button>
              </li>  
          }
          else if( x.counter === 1) {
            return <li className='Completed-text' key={key}>
              <input type='checkbox' checked={x.tick}  onChange={(e) => { x.tick = 0; x.counter = 0; setTick(!tick);  }} />
               {x.value} 
              <button onClick={(e) => { x.counter = 2; setTick((!tick));}}>
                Edit
              </button>
              <button onClick={(e) => {x.counter = 3; setTick(!tick);}}>
                Deleted
              </button>
              </li>
          }
          else if( x.counter === 2) {
            return <li key={key}>
              <form >
                <input type='checkbox' checked={x.tick} disabled/>
                <input type='text' onChange={(e)=> { setRevalue(e.target.value)}}/>
                <button type='submit' onClick={(e)=> {e.preventDefault(); x.value=revalue; x.counter=x.tick; setTick(!tick);}}>
                  Make Edits
                </button>
                <button onClick={(e) => {x.counter = 3; setTick(!tick)}} disabled>
                  Deleted
                </button>
              </form>
              </li>
              
          }
          else {
            setTodo(todo => todo.filter((y)=> {
              return y.id !== x.id;
            })); 
          }
          
          })
        }
      </ul>
      <form >
        <input className="Add-input" type="text" value={value} onChange={(e)=> setValue(e.target.value)} placeholder='Enter the new entry'/>
        <button className="Add-button" type='submit' onClick={(e)=>HandleAdd(e)}>+</button>
      </form>

      
      
    </div>
  );
}

export default App;


  