import './App.css';
import React, { useState,useEffect, useId } from 'react';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [revalue, setRevalue] = useState("");
  const [tick, setTick] = useState(true);
  const [value, setValue] = useState("");
  const layout = {
    id : String,
    value : String,
    tick : Number,
    counter : Number
  };
  const [todo, setTodo] = useState(localStorage.getItem('data')? JSON.parse(localStorage.getItem('data')): [layout]);
  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem('data'));
  //   if(storedData){
  //     setTodo(storedData);
  //   }
  //   // return()=> {
  //   //   localStorage.setItem('data', JSON.stringify(todo))
  //   // }
  // }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(todo));
  }, [tick]);



  function HandleAdd(e) {
    e.preventDefault();
    if(value === "") {
        return;
    }
    setTodo(todo => todo.filter((y)=> {
      return y.value !== value;
    })); 
    const new_id = crypto.randomUUID();
    setTodo(todo => [...todo, {id : new_id, value: value, tick : 0, counter : 0}]);
    setValue("");
    setTick(!tick);
    console.log(todo);
  }

  function HandleTick(x, tick_value, counter_value) {
    x.tick = tick_value;
    x.counter = counter_value;
    setTick(!tick);
  }

  function HandleEdit(e, x) {
    e.preventDefault();
    if(revalue === "") {
        x.counter = x.tick;
        setTick(!tick);
        return;
    }
    // setTodo(todo => todo.filter((y)=> {
    //   return (y.value !== revalue);
    // })); 
    x.value=revalue;
    x.counter=x.tick;
    setRevalue("");
    setTick(!tick);

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
                <input  type='checkbox' checked={x.tick}  onChange={(e) => { HandleTick(x, 1, 1)}} />
                <div className='list-input'>{x.value} </div> 
                <button onClick={(e) => { HandleTick(x, x.tick, 2)}}>
                  Edit
                </button>
                <button onClick={(e) => {HandleTick(x, x.tick, 3)}}>
                  Delete
                </button>
              </li>  
          }
          else if( x.counter === 1) {
            return <li className='Completed-text' key={key}>
              <input  type='checkbox' checked={x.tick}  onChange={(e) => { HandleTick(x, 0, 0)}} />
               {x.value} 
              <button onClick={(e) => { HandleTick(x, x.tick, 2)}}>
                Edit
              </button>
              <button onClick={(e) => {HandleTick(x, x.tick, 3)}}>
                Delete
              </button>
              </li>
          }
          else if( x.counter === 2) {
            return <li key={key}>
              <form >
                <input type='checkbox' checked={x.tick} disabled/>
                <input className='list-input'  type='text' onChange={(e)=> { setRevalue(e.target.value)}}/>
                <button type='submit' onClick={(e)=> {HandleEdit(e, x)}}>
                  Make Edits
                </button>
                <button onClick={(e) => {x.counter = 3; setTick(!tick)}} disabled>
                  Delete
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


// const [data, setData] = useState([]);
// useEffect(() => {
//  const storedData = JSON.parse(localStorage.getItem('data'));
//  if(storedData){
//   setData(storedData);
//  }
// }, []);

// useEffect(() => {
//   localStorage.setItem('data', JSON.stringify(data));
// }, [data]);
  