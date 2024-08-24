import { useState } from 'react'
import './CreateArea_style.css'


function CreateNewTaskForm({setTittle,setIsAdding,goAndCreateTask}){ //--------------------------------------------- [ CreateArea ] -
  const handleSubmit = (e)=>{
    e.preventDefault()
    // CREATE NEW TASK (send to board)
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
    if(!tittle.trim().length){return} // cancel if is empty
    createNewTask(tittle,group_id)
  }


  return(
    <>
      {isAdding ? <CreateNewTaskForm setTittle={setTittle} setIsAdding={setIsAdding} goAndCreateTask={goAndCreateTask}/> : <CreateNewTaskButton setIsAdding={setIsAdding} /> }
    </>
  )
}

export { CreateTask }