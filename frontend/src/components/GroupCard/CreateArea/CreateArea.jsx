import { useState,useContext,useEffect,useRef } from 'react'
import './CreateArea_style.css'

import { GlobalContext } from '../../../pages/BoardPage/Context/BoardContext'

function CreateNewTaskForm({tittle,setTittle,description,setDescription,setIsAdding,goAndCreateTask}){ //--------------------------------------------- [ CreateArea ] -
  
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsAdding(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(!tittle.trim().length){return} // cancel if is empty
    if(tittle.length > 100){
      alert("Task's Tittle can not have more than a 100 characters!")
      return
    }

    if(description.length > 1200){
      alert("Task's Description can not have more than a 1200 characters!")
      return
    }

    goAndCreateTask()
    setTittle('')
    setDescription('')
    setIsAdding(false)
  }

  return(
    <form ref={formRef} className='createForm' onSubmit={handleSubmit}>
      <input type="text" autoFocus className='createForm-input' placeholder='Task tittle' onChange={(e)=>{setTittle(e.target.value)}}/>
      <textarea className='createForm-input' placeholder='Task description (optional)' onChange={(e)=>{setDescription(e.target.value)}}/>

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

function CreateTask({group_id}){ //------------------------------------------------- [ CreateTask ] -
  const [tittle,setTittle] = useState('')
  const [description,setDescription] = useState('')
  const [isAdding,setIsAdding] = useState(false)

  const {createNewTask} = useContext(GlobalContext)

  const goAndCreateTask = ()=>{
    createNewTask(tittle,description,group_id)
  }

  return(
    <>
      {isAdding ? <CreateNewTaskForm tittle={tittle} setTittle={setTittle} description={description}
      setDescription={setDescription} setIsAdding={setIsAdding} goAndCreateTask={goAndCreateTask}/> :

      <CreateNewTaskButton setIsAdding={setIsAdding} /> }
    </>
  )
}

export { CreateTask }