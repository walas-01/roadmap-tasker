import React, { useState } from 'react'
import './GroupCard_style.css'


import TaskCard from '../TaskCard/TaskCard.jsx'
import { MdOutlineCircle } from "react-icons/md"

function GroupCard({tittle, id, taskList}){

  const groupTasks = taskList.filter((t)=> t.groupId == id)


  /// --- Handlers
  const handleDragStart = (e,taskObject)=>{
    e.dataTransfer.setData("cardId",taskObject.id)
  }


  return( // ------------------------------------- return
    <div className="groupCard">

      <h3 className="groupCard-tittle"><MdOutlineCircle size={20}/>{tittle}</h3>

      <ul className='groupCard-taskList'>

        {groupTasks.map((t,index)=>{ return <TaskCard key={index} id={t.id} tittle={t.tittle} groupId={t.groupId}/> })}

      </ul>

    </div>
  )
}

export default GroupCard