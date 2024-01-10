import { Fragment, useState } from "react";
import './Todos.css'
// Icons
import { MdDelete } from "react-icons/md";

function CompletedTodoList(props){
    const {completedList, setCompletedList} = props
  
    const handleDeleteTodo = (t)=>{
        const updatedCompletedTodoList = completedList.filter((todo) => t.id !== todo.id);
        setCompletedList(updatedCompletedTodoList);
        localStorage.setItem('completedList', JSON.stringify(updatedCompletedTodoList))
    }
    return(
        <Fragment>
            <div>
                {completedList ? 
                completedList.map((t)=>{
                    return <div key={t.id} className="todo-comp">
                        <div className="todo-content">
                            <h3>{t.title}</h3>
                            <h6>{t.description}</h6>
                        </div>
                        <div className="todo-icons">
                            <MdDelete className="icon" onClick={()=>handleDeleteTodo(t)}/>
                        </div>
                    </div>
                }) : null}
            </div>
            
        </Fragment>
    )
}


export default CompletedTodoList