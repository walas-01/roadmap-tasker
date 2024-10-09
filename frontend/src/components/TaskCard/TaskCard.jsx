import React, { useContext, useState, useRef ,useEffect} from 'react'
import './TaskCard_style.css'
import { GlobalContext } from '../../pages/BoardPage/Context/BoardContext'

// import icons
import { GoGrabber } from "react-icons/go"
import { ImCheckboxUnchecked,ImCheckboxChecked } from "react-icons/im"
import { RiArrowDownSFill,RiArrowUpSFill } from "react-icons/ri"
import { FaRegEdit } from "react-icons/fa";
import icon1 from '../../imgs/roadIcon1.png'

const EditingTask = ({taskObject,setIsEditing})=>{
  const [newTittle,setNewTittle] = useState(taskObject.tittle)
  const [newDescription,setNewDescription] = useState(taskObject.description)

  const {editTask} = useContext(GlobalContext)
  
  const formRef = useRef(null); // --------------------------------------------------- cancel on blur
  useEffect(() => { 
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsEditing(false); 
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // ------------------------------------------------------ event handlers

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log("[editingTask]: i wanna update task!")
    console.log("[newTittle]: ",newTittle)
    console.log("[newDescription]: ",newDescription)

    if(!newTittle.trim().length){return} // cancel if is empty
    if(newTittle.length > 100){
      alert("Task's Tittle can not have more than a 100 characters!")
      return
    }

    if(newDescription.length > 1200){
      alert("Task's Description can not have more than a 1200 characters!")
      return
    }

    editTask(taskObject.task_id,taskObject.ownerGroup_id,newTittle,newDescription)

    setIsEditing(false)
  }


  return(
    <form ref={formRef} className='taskCard-editForm' onSubmit={handleSubmit}>
      <input className='taskCard-editForm-input' type="text" placeholder='Task tittle' value={newTittle} onChange={(e)=>{setNewTittle(e.target.value)}}/>
      <textarea className='taskCard-editForm-input' placeholder='Task description (optional)' value={newDescription} onChange={(e)=>{setNewDescription(e.target.value)}}/>
      <div className='taskCard-editForm-buttons'>
        <button type='submit' className='taskCard-editForm-doneButton'>Done</button>
        <button className='taskCard-editForm-cancelButton' onClick={()=>{setIsEditing(false)}}>Cancel</button>
      </div>
    </form>
  )
}

function TaskCard({taskObject}){ // ------------------------------------------------------------- [ TaskCard ]- 
  const [isOpen,setIsOpen] = useState(false)
  const [isEditing,setIsEditing] = useState(false)

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

  const handleEdit = ()=>{
    setIsEditing(!isEditing)
  }

  return(
    <>
      {isEditing?
        <EditingTask taskObject={taskObject} setIsEditing={setIsEditing}/> :

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
              '' : <button className='taskCard-button' onClick={handleOpen}> {isOpen? <RiArrowUpSFill size={30}/> : <RiArrowDownSFill size={30}/>}  </button>
            }

            <button className='taskCard-button' onClick={handleEdit}> <FaRegEdit color='white' size={18} /> </button>

          </div>

          { isOpen && taskObject.description && taskObject.description !== '' ?  
          <div className='taskCard-body'>
            <p> {taskObject.description} </p>
          </div>
          : ''
          }
        </li>

      }
    </>
  )
}

export default TaskCard 