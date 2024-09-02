import React, { useContext, useState } from 'react'
import './TaskCard_style.css'
import { GlobalContext } from '../../pages/BoardPage/Context/BoardContext'

import { GoGrabber } from "react-icons/go"
import { ImCheckboxUnchecked,ImCheckboxChecked } from "react-icons/im"
import { RiArrowDownSFill,RiArrowUpSFill } from "react-icons/ri"

function TaskCard({taskObject}){
  const [isOpen,setIsOpen] = useState(false)

  const {task_id,tittle,isDone,ownerGroup_id} = taskObject
  const {setActiveCard,checkTask} = useContext(GlobalContext)

  // ---------- event handlers
  const handleDragStart = (e)=>{
    setIsOpen(false)
    setActiveCard(taskObject)
  }
  const handleDragEnd = (e)=>{
    setActiveCard(null)
  }

  const handleCheckButton = (e)=>{
    checkTask(task_id,ownerGroup_id)
  }

  const handleOpen = ()=>{
    setIsOpen(!isOpen)
  }

  return(
    <li className={`taskCard ${isDone?"doneTask":""}`} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>

      <div className={`taskCard-head`}>
        <div className='taskCard-icons'>
          <GoGrabber size={30}/>
          <button onClick={handleCheckButton}>
            {
              isDone ? <ImCheckboxChecked size={17}/> : <ImCheckboxUnchecked size={17}/>
            }
          </button>
        </div>

        <p className='taskCard-tittle'>{tittle}</p> 

        {!taskObject.description || taskObject.description == '' ? 
          '' : <button className='taskCard-openButton' onClick={handleOpen}> {isOpen? <RiArrowUpSFill size={30}/> : <RiArrowDownSFill size={30}/>}  </button>
        }
      </div>

      { isOpen && taskObject.description && taskObject.description !== '' ?  
      <div className='taskCard-body'>
        <p> {taskObject.description} </p>
      </div>
      : ''
      }
    </li>
  )
}

export default TaskCard 