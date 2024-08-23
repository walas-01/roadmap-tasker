import React, { useState } from 'react'
import { GoGrabber } from "react-icons/go"
import './TaskCard_style.css'


function TaskCard({taskObject,setActiveCard}){

  const {task_id,tittle} = taskObject

  // ---------- event handlers
  const handleDragStart = (e)=>{
    setActiveCard(taskObject)
  }
  const handleDragEnd = (e)=>{
    setActiveCard(null)
  }


  return(
    <li className='taskCard' draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <GoGrabber size={25}/>{tittle}
    </li>

  )
}

export default TaskCard 