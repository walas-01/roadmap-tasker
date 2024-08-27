import { useState } from 'react'
import './CreateArea_style.css'

function CreateNewTaskForm({tittle,setTittle,setIsAdding,goAndCreateTask}){ //--------------------------------------------- [ CreateArea ] -
  const handleSubmit = (e)=>{
    e.preventDefault()

    if(!tittle.trim().length){return} // cancel if is empty
    if(tittle.length > 100){
      alert("Task's Tittle can not have more than a 100 characters!")
      return
    }
    goAndCreateTask()
    setIsAdding(false)
  }

  return(
    <form className='createForm' onSubmit={handleSubmit}>
      <textarea autoFocus className='createForm-input' placeholder='new task' onChange={(e)=>{setTittle(e.target.value)}}/>
      <div className='createForm-buttons'>
        <button type='submit' className='createForm-buttons-add'>Add +</button>
        <button className='createForm-buttons-cancel' onClick={()=>{setIsAdding(false)}}>Cancel</button>
      </div>
    </form>
  )
}

function CreateNewTaskButton({setIsAdding}){ //-------------------- [ CreateNewTaskButton ] -
  return(
    <button className='createButton' onClick={()=>{setIsAdding(true)}}>
      Add task +
    </button>
  )
}

function CreateTask({createNewTask,group_id}){
  const [tittle,setTittle] = useState("")
  const [isAdding,setIsAdding] = useState(false)

  const goAndCreateTask = ()=>{
    createNewTask(tittle,group_id)
  }

  return(
    <>
      {isAdding ? <CreateNewTaskForm tittle={tittle} setTittle={setTittle} setIsAdding={setIsAdding} goAndCreateTask={goAndCreateTask}/> : <CreateNewTaskButton setIsAdding={setIsAdding} /> }
    </>
  )
}

export { CreateTask }