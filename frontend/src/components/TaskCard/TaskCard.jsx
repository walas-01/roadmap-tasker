import React, { useContext, useState } from 'react'
import { GoGrabber } from "react-icons/go"
import './TaskCard_style.css'
import { GlobalContext } from '../../pages/BoardPage/Context/BoardContext'; 

import { ImCheckboxUnchecked,ImCheckboxChecked } from "react-icons/im";

function TaskCard({taskObject}){
  const {task_id,tittle,isDone,ownerGroup_id} = taskObject
  const {setActiveCard,checkTask} = useContext(GlobalContext)

  // ---------- event handlers
  const handleDragStart = (e)=>{
    setActiveCard(taskObject)
  }
  const handleDragEnd = (e)=>{
    setActiveCard(null)
  }

  const handleCheckButton = (e)=>{
    checkTask(task_id,ownerGroup_id)
  }

  return(
    <li className={`taskCard ${isDone?"doneTask":""}`} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className='taskCard-icons'>
        <GoGrabber size={30}/>
        <button onClick={handleCheckButton}>
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