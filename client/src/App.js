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
    tick : Boolean,
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
    setTodo(todo => [...todo, {id : new_id, value: value, tick : false, counter : 0}]);
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
        x.counter = Number(x.tick);
        setTick(!tick);
        return;
    }
    setTodo(todo => todo.filter((y)=> {
      return (y.value !== revalue);
    })); 
    const new_id = crypto.randomUUID();
    setTodo(todo => [...todo, {id : new_id, value: revalue, tick : false, counter : 0}]);
    setValue("");
    setTick(!tick);
    x.value=revalue;
    x.counter=Number(x.tick);
    setRevalue("");
    setTick(!tick);

  }

  return (
    <div className="App">
      <header className="App-header">
       To-do list
      </header>
      <form className='new-entry'>
        <input className="Add-input" type="text" value={value} onChange={(e)=> setValue(e.target.value)} placeholder='Enter the new entry'/>
        <button className="Add-button" type='submit' onClick={(e)=>HandleAdd(e)}>+</button>
      </form>
      <ul className='App-list'>
        {todo.map((x, key)=> { 
          if(x.counter === 0 ) {
              return <li key={key}>
                <div className='left-items'>
                  <input  type='checkbox' checked={x.tick}  onChange={(e) => { HandleTick(x, 1, 1)}} />
                  <div className='list-input'>{x.value} </div>
                </div>
                <div className='right-items'> 
                  <button onClick={(e) => { HandleTick(x, x.tick, 2)}}>
                    Edit
                  </button>
                  <button variant="outlined" color="error" onClick={(e) => {HandleTick(x, x.tick, 3)}}>
                    Delete
                  </button>
                </div>
              </li>  
          }
          else if( x.counter === 1) {
            return <li  key={key}>
              <div className='left-items Completed-text'>
                <input  type='checkbox' checked={x.tick}  onChange={(e) => { HandleTick(x, 0, 0)}} />
                {x.value} 
              </div>
              <div className='right-items'>
                <button onClick={(e) => { HandleTick(x, x.tick, 2)}}>
                  Edit
                </button>
                <button onClick={(e) => {HandleTick(x, x.tick, 3)}}>
                  Delete
                </button>
              </div> 
              </li>
          }
          else if( x.counter === 2) {
            return <li key={key}>
              <form className='form-st'>
                <div className='left-items'>
                  <input type='checkbox' checked={x.tick} disabled/>
                  <input className='list-input'  type='text' onChange={(e)=> { setRevalue(e.target.value)}}/> 
                </div>
                <div className='right-items'>
                  <button type='submit' onClick={(e)=> {HandleEdit(e, x)}}>
                    Make Edits
                  </button>
                  <button onClick={(e) => {x.counter = 3; setTick(!tick)}} disabled>
                    Delete
                  </button>
                </div>
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
  
// {
//   0 : unchecked,
//   1 : checked,
//   2 : editing,
//   3 : deleted
// }