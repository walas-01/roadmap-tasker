import React, { useContext, useEffect, useState } from 'react'
import './GroupCard_style.css'
import { CreateTask } from './CreateArea/CreateArea.jsx'
import { GlobalContext } from '../../pages/BoardPage/Context/BoardContext.jsx'

// react icons
import { MdRadioButtonUnchecked,MdRadioButtonChecked } from "react-icons/md"
import { IoIosArrowDropup,IoIosArrowDropdownCircle } from "react-icons/io"
import { FaTrashCan } from "react-icons/fa6"

// import components
import TaskCard from '../TaskCard/TaskCard.jsx'
import DropArea from '../DropArea/DropArea.jsx'
import { Popup } from '../Popup/Popup.jsx'


const EditingInput = ({groupId,tittle,setTittle,setIsEditing})=>{  // ---------------------------- [ input ] -

  const {editGroup} = useContext(GlobalContext)

  const handleChange = (e)=>{
    setTittle(e.target.value)
  }

  const handleKeyDown = (e)=>{ 
    if(e.key === 'Enter'){

      if(!tittle.trim().length){ // cancel if is empty
        setIsEditing(false)
      } 
      if(tittle.length > 50){
        alert("Group's Tittle can not have more than a 50 characters!")
      }

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

  const {deleteGroup} = useContext(GlobalContext)

  const [isEditing,setIsEditing] = useState(false)
  const [isCompleted,setIsCompleted] = useState(false)
  const [isOpen,setIsOpen] = useState(true)
  const [isDeleting,setIsDeleting] = useState(false)

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

  const handleDelete = ()=>{
    console.log("[groupCard]: deleting Group: ", groupObject.tittle)
    console.log("[groupCard]: deleting Group_id: ", groupObject.group_id)

    setIsDeleting(true)
    //
  }

  return( // ------------------------------------- return
    <>
      <div className='groupCard'>


        <div className='groupCard-headContainer'>
          <h3 className="groupCard-head">

            <div className="groupCard-head-tittle" onDoubleClick={handleDoubleClick}>
              {isCompleted? <MdRadioButtonChecked size={24}/> : <MdRadioButtonUnchecked size={24}/>}

              {isEditing ?
              <EditingInput groupId={groupObject.group_id} tittle={tittle} setTittle={setTittle} setIsEditing={setIsEditing} /> :
              <>{tittle}</> }

            </div>

            <button className='groupCard-head-openButton' onClick={()=>{setIsOpen(!isOpen)}}>
              {isOpen? <IoIosArrowDropup size={30}/> : <IoIosArrowDropdownCircle size={30}/> }
            </button>

          </h3>
          <button className='groupCard-head-deleteButton' onClick={handleDelete}> <FaTrashCan size={20}/> </button>
        </div>

        {isOpen?
          <div className='groupCard-tasksSection'>
            <ul className='groupCard-taskList'>
              <DropArea groupId={groupObject.group_id} position={0} />
              {groupObject.tasks.map((t,index)=>{
                return (
                    <React.Fragment key={t.task_id}>
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
      {isDeleting? 
        <Popup 
          btn1='Cancel'
          btn2='Delete'
          func={()=>{deleteGroup(groupObject.group_id)}}
          tittle='Delete Group'
          text='Are you sure?'
          controlState={setIsDeleting}
        />:''
      }
      
    </>
  )
}

export default GroupCard