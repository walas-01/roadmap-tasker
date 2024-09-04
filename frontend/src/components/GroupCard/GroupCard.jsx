import React, { useContext, useEffect, useState } from 'react'
import './GroupCard_style.css'
import { CreateTask } from './CreateArea/CreateArea.jsx'
import { GlobalContext } from '../../pages/BoardPage/Context/BoardContext.jsx'

// react icons
import { MdRadioButtonUnchecked,MdRadioButtonChecked } from "react-icons/md"
import { IoIosArrowDropup,IoIosArrowDropdownCircle } from "react-icons/io"

// import components
import TaskCard from '../TaskCard/TaskCard.jsx'
import DropArea from '../DropArea/DropArea.jsx'


const EditingInput = ({groupId,tittle,setTittle,setIsEditing})=>{  // ---------------------------- [ input ] -

  const {editGroup} = useContext(GlobalContext)

  const handleChange = (e)=>{
    setTittle(e.target.value)
  }

  const handleKeyDown = (e)=>{ 
    if(e.key === 'Enter'){

      editGroup(groupId,tittle)

      console.log('[Group]: tittle updated')
      setIsEditing(false)
    }
  }

  const handleBlur = ()=>{
    console.log('[Group]: tittle updated')
    setIsEditing(false)
  }

  return(
    <input className='groupCard-editingInput' value={tittle} 
      autoFocus 
      type='text' 
      onChange={handleChange} 
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  )
}


function GroupCard({groupObject}){ // --------------------------------------------- [ GroupComponent ] -
  const [tittle,setTittle] = useState(groupObject.tittle)

  const [isEditing,setIsEditing] = useState(false)
  const [isCompleted,setIsCompleted] = useState(false)
  const [isOpen,setIsOpen] = useState(true)

  useEffect(()=>{
    if(groupObject.tasks.every((task)=> task.isDone == true)){
      setIsCompleted(true)
    }else{
      setIsCompleted(false)
    }
  })

  // --------------------- event handlers

  const handleDoubleClick = ()=>{
    setIsEditing(true)
  }


  return( // ------------------------------------- return
    <div className='groupCard'>

      <h3 className="groupCard-head">

      <div className="groupCard-head-tittle" onDoubleClick={handleDoubleClick}>
        {isCompleted? <MdRadioButtonChecked size={24}/> : <MdRadioButtonUnchecked size={24}/>}

        {isEditing ?
        <EditingInput groupId={groupObject.group_id} tittle={tittle} setTittle={setTittle} setIsEditing={setIsEditing} /> :
        <>{tittle}</> }

      </div>
        <button className='groupCard-head-button' onClick={()=>{setIsOpen(!isOpen)}}>
          {isOpen? <IoIosArrowDropdownCircle size={30}/> : <IoIosArrowDropup size={30}/> }
        </button>
      </h3>

      {isOpen?
        <div className='groupCard-tasksSection'>
          <ul className='groupCard-taskList'>
            <DropArea groupId={groupObject.group_id} position={0} />
            {groupObject.tasks.map((t,index)=>{
              return (
                  <React.Fragment key={index}>
                    <TaskCard taskObject={t} /> 
                    <DropArea groupId={groupObject.group_id} position={index+1} />
                  </React.Fragment>
              )
            })}
          </ul>

          <CreateTask group_id={groupObject.group_id}/>
        </div>
        : <div className='groupCard-space'></div>
      }

    </div>
  )
}

export default GroupCard