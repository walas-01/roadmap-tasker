import React, { useState } from 'react'
import './GroupCard_style.css'

import { MdOutlineCircle } from "react-icons/md"

// import components
import TaskCard from '../TaskCard/TaskCard.jsx'
import DropArea from '../DropArea/DropArea.jsx'


function GroupCard({groupObject, setActiveCard,moveTask}){
  const [active,setActive] = useState(false)

  const {group_id,tittle,tasks} = groupObject

  //* const groupTasks = taskList.filter((t)=> t.groupId == id)

  return( // ------------------------------------- return
    <div className={`groupCard ${active? 'activeGroup':''} `}>

      <h3 className="groupCard-tittle"><MdOutlineCircle size={20}/>{tittle}</h3>

      <ul className='groupCard-taskList'>
        
        {tasks.map((t,index)=>{
          return (
              <React.Fragment key={index}>
                <TaskCard taskObject={t}  setActiveCard={setActiveCard} /> 
                <DropArea groupId={t.ownerGroup_id} position={index+1} moveTask={moveTask}/>
              </React.Fragment>
          )
          
        })}
        <p>+ Add new task </p>
      </ul>

    </div>
  )
}

export default GroupCard