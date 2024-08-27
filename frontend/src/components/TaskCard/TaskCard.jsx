import React, { useState } from 'react'
import { GoGrabber } from "react-icons/go"
import './TaskCard_style.css'

import { ImCheckboxUnchecked,ImCheckboxChecked } from "react-icons/im";

function TaskCard({taskObject,setActiveCard}){

  const {task_id,tittle,isDone} = taskObject

  // ---------- event handlers
  const handleDragStart = (e)=>{
    setActiveCard(taskObject)
  }
  const handleDragEnd = (e)=>{
    setActiveCard(null)
  }

  const handleCheckButton = (e)=>{
    // CALL checkTask()
  }

  return(
    <li className={`taskCard ${isDone?"doneTask":""}`} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className='taskCard-icons'>
        <GoGrabber size={30}/>
        <button onClick={()=>{console.log("checking in!")}}>
          {
            isDone ? <ImCheckboxChecked size={17}/> : <ImCheckboxUnchecked size={17}/>
          }
        </button>
      </div>
      {tittle}
    </li>

  )
}

export default TaskCard 