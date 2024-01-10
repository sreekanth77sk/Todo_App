import './App.css';

import { Fragment, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import TodoList from './Components/Todos';
import CompletedTodoList from './Components/CompletedTodos';

function App() {
//------------------ state hooks ------------------------------//
  const [todoTitle, setTodoTitle] = useState('')
  const [todoDescription, setTodoDescription] = useState('')
  const [tab, setTab] = useState('todo')
  const [fullTodoList, setFullTodoList] = useState([])
  const [completedList, setCompletedList] = useState([])
  const id = uuid()

//----------------- event handlers ------------------------------//
  const handleTodoTab = ()=>{
    setTab('todo')
  }
  const handleCompletedTab = ()=>{
    setTab('completed')
  }

  const handleAddTodo = (e)=>{
    e.preventDefault()
    const newTodoList = [...fullTodoList] 

    newTodoList.push({ id : id, title:todoTitle, description : todoDescription})

    setFullTodoList(newTodoList)
    localStorage.setItem('fullTodoList',JSON.stringify(newTodoList))
    setTodoTitle("")
    setTodoDescription("")
  }
  //--------------------------------------------------------------


  useEffect(()=>{
    let savedFullList = JSON.parse(localStorage.getItem('fullTodoList'))
    if(savedFullList){setFullTodoList(savedFullList)}
  },[])


 

  return (
    <Fragment>
      
        
    
      
      <form onSubmit={(e)=> handleAddTodo(e)} className='add-todo-form'>
        <div className='heading'><h3>Todo's List</h3></div>
        <div className='input-form'>
        <>
        <label htmlFor = 'titleInput'>Title: </label>
        <input type='text' id='titleInput' className='titleInput' required placeholder='What needs to be done?'
        value={todoTitle} onChange={(e)=>setTodoTitle(e.target.value)}/></>
        <>
        <label htmlFor='descriptionInput'> Description: </label>
        <input type='text' id='descriptionInput' className='descriptionInput' required placeholder='Description'
        value={todoDescription} onChange={(e)=>setTodoDescription(e.target.value)}/></>
        <button type='submit' className='add-btn'>Add</button>
        </div>

      </form>

      <div className='list-card'>
        <div className='tabs'>
          <button onClick={()=>handleTodoTab()} className={`tab ${tab === 'todo' ? 'tab-checked' : ''}`}>Todo's</button>
          <button onClick={()=>handleCompletedTab()} className={`tab ${tab !== 'todo' ? 'tab-checked' : ''}`}>Completed</button>
        </div>
        <div>
          {tab === 'todo' ? <TodoList fullTodoList = {fullTodoList} completedList={completedList} 
          setCompletedList = {setCompletedList} setFullTodoList = {setFullTodoList}/> :
                           <CompletedTodoList completedList = {completedList} 
                           setCompletedList = {setCompletedList}/> 
                        }  
        </div>
      </div>

      
    </Fragment>
  );
}

export default App;
