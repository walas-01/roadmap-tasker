import React, { useEffect, useState } from 'react'
import './GroupCard_style.css'
import { CreateTask } from './CreateArea/CreateArea.jsx'

// react icons
import { MdRadioButtonUnchecked,MdRadioButtonChecked } from "react-icons/md";
import { RiArrowDownSFill,RiArrowUpSFill } from "react-icons/ri";
import { RiArrowUpWideLine, RiArrowDownWideLine} from "react-icons/ri";



// import components
import TaskCard from '../TaskCard/TaskCard.jsx'
import DropArea from '../DropArea/DropArea.jsx'




function GroupCard({groupObject}){ // ----------------------------- [ GroupComponent ] -
  const [active,setActive] = useState(false)
  const [isCompleted,setIsCompleted] = useState(false)
  const [isOpen,setIsOpen] = useState(true)

  const {group_id,tittle,tasks} = groupObject

  useEffect(()=>{
    if(tasks.every((task)=> task.isDone == true)){
      setIsCompleted(true)
    }else{
      setIsCompleted(false)
    }
  })

  //* const groupTasks = taskList.filter((t)=> t.groupId == id)

  return( // ------------------------------------- return
    <div className={`groupCard ${active? 'activeGroup':''} `}>

      <h3 className="groupCard-head">

        <div className="groupCard-head-tittle">
          {isCompleted? <MdRadioButtonChecked size={24}/> : <MdRadioButtonUnchecked size={24}/>}
          {tittle}
        </div>

        <button className='groupCard-head-button' onClick={()=>{setIsOpen(!isOpen)}}>
          {isOpen? <RiArrowDownSFill size={30}/> : <RiArrowUpSFill size={30}/> }
        </button>
      </h3>

      {isOpen?
        <div className='groupCard-tasksSection'>
          <ul className='groupCard-taskList'>
            <DropArea groupId={group_id} position={0} />
            {tasks.map((t,index)=>{
              return (
                  <React.Fragment key={index}>
                    <TaskCard taskObject={t} /> 
                    <DropArea groupId={group_id} position={index+1} />
                  </React.Fragment>
              )
            })}
          </ul>

          <CreateTask group_id={group_id}/>
        </div>
        : <div className='groupCard-space'></div>
      }

    </div>
  )
}

export default GroupCard