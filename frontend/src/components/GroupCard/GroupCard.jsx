import React, { useState } from 'react'
import './GroupCard_style.css'

import { MdOutlineCircle } from "react-icons/md"

// import components
import TaskCard from '../TaskCard/TaskCard.jsx'
import DropArea from '../DropArea/DropArea.jsx'

import { CreateTask } from './CreateArea/CreateArea.jsx'



function GroupCard({groupObject, setActiveCard,moveTask,createNewTask}){ // ----------------------------- [ GroupComponent ] -
  const [active,setActive] = useState(false)

  const {group_id,tittle,tasks} = groupObject

  //* const groupTasks = taskList.filter((t)=> t.groupId == id)

  return( // ------------------------------------- return
    <div className={`groupCard ${active? 'activeGroup':''} `}>

      <h3 className="groupCard-tittle"><MdOutlineCircle size={20}/>{tittle}</h3>

      <ul className='groupCard-taskList'>
        <DropArea groupId={group_id} position={0} moveTask={moveTask}/>
        {tasks.map((t,index)=>{
          return (
              <React.Fragment key={index}>
                <TaskCard taskObject={t}  setActiveCard={setActiveCard} /> 
                <DropArea groupId={group_id} position={index+1} moveTask={moveTask}/>
              </React.Fragment>
          )
          
        })}

      </ul>

      <CreateTask group_id={group_id} createNewTask={createNewTask}/>
    </div>
  )
}

export default GroupCard