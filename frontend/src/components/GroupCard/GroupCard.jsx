import React, { useState } from 'react'
import './GroupCard_style.css'

import { MdOutlineCircle } from "react-icons/md"

// import components
import TaskCard from '../TaskCard/TaskCard.jsx'
import DropArea from '../DropArea/DropArea.jsx'


function GroupCard({tittle, id, taskList, setActiveCard,moveTask}){
  const [active,setActive] = useState(false)

  //* const groupTasks = taskList.filter((t)=> t.groupId == id)

  return( // ------------------------------------- return
    <div className={`groupCard ${active? 'activeGroup':''} `}>

      <h3 className="groupCard-tittle"><MdOutlineCircle size={20}/>{tittle}</h3>

      <ul className='groupCard-taskList'>
        
        {taskList.map((t,index)=>{
          if(t.groupId == id){

          return (
              <React.Fragment key={index}>
                <TaskCard id={t.id} tittle={t.tittle}  setActiveCard={setActiveCard} /> 
                <DropArea groupId={t.groupId} position={index+1} moveTask={moveTask}/>
              </React.Fragment>
          )
          
        }})}

      </ul>

    </div>
  )
}

export default GroupCard