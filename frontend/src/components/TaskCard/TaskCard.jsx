import React, { useState } from 'react'
import { GoGrabber } from "react-icons/go"
import './TaskCard_style.css'

function TaskCard({id,tittle,groupId}){
  return(
    <li className='taskCard' draggable  >
      <GoGrabber size={25}/>{tittle}
    </li>
  )
}

export default TaskCard 