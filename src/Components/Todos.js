import { Fragment, useEffect, useState } from "react";
import './Todos.css'
// Icons
import { FaRegCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function TodoList(props){
    const {fullTodoList, completedList, setCompletedList, setFullTodoList } = props

    const handleDeleteTodo = (t)=>{
        const updatedFullTodoList = fullTodoList.filter((todo) => t.id !== todo.id);
        setFullTodoList(updatedFullTodoList);
        localStorage.setItem('fullTodoList', JSON.stringify(updatedFullTodoList))
    }
    const handleChecked = (t)=>{
      const newCompletedList = [...completedList]
      newCompletedList.push(t)
      setCompletedList(newCompletedList)
      localStorage.setItem('completedList', JSON.stringify(newCompletedList))
      const updatedFullTodoList = fullTodoList.filter((todo) => t.id !== todo.id);
      setFullTodoList(updatedFullTodoList);
      localStorage.setItem('fullTodoList', JSON.stringify(updatedFullTodoList))

    }

    useEffect(()=>{
        let savedCompletedList = JSON.parse(localStorage.getItem('completedList'))
        if(savedCompletedList){setCompletedList(savedCompletedList)}
    },[])
   
    return(
        <Fragment>
            <div>
                {fullTodoList ? 
                fullTodoList.map((t)=>{
                    return <li key={t.id} className="todo-comp">
                        <div className="todo-content">
                            <h3>{t.title}</h3>
                            <h6>{t.description}</h6>
                        </div>
                        <div className="todo-icons">
                            <FaRegCheckCircle className="icon" onClick={()=>handleChecked(t)}/>
                            <MdDelete className="icon" onClick={()=>handleDeleteTodo(t)} />
                        </div>
                    </li>
                }) : null}
            </div>
            
        </Fragment>
    )
}

export default TodoList

