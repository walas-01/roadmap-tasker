import { useContext, useEffect, useState } from 'react'
import './TodoBlock_style.css'
import { GlobalContext } from '../../pages/BoardPage/Context/BoardContext.jsx'

import { ImCheckboxUnchecked,ImCheckboxChecked } from "react-icons/im"
import { ImCross } from "react-icons/im"
import { MdAddToPhotos } from "react-icons/md";


const StaredTaskCard = ({taskObject})=>{ // -------------------------------------------- [ StaredTaskCard ]
  const {checkTask,starTask} = useContext(GlobalContext)

  const handleCheck = ()=>{
    checkTask(taskObject.task_id,taskObject.ownerGroup_id)
  }

 const handleRemoveFromTodo = () =>{
    starTask(taskObject.task_id,taskObject.ownerGroup_id)
 }

  return(
    <li className={`staredTaskCard ${taskObject.isDone && 'staredTaskCard-doneTask'} `}>
      <button className='staredTaskCard-button' onClick={handleCheck}> {taskObject.isDone? <ImCheckboxChecked color='white' size={22}/> : <ImCheckboxUnchecked color='white' size={22}/>}</button>
      <p className='staredTaskCard-text'>{taskObject.tittle}</p>
      <button className='staredTaskCard-button removeButton' onClick={handleRemoveFromTodo}> <ImCross /> </button>
    </li>
  )
}

const DropArea = ()=>{ // -------------------------------------------- [ DropArea ]
  const [active,setActive] = useState(false)

  const {starActiveTask} = useContext(GlobalContext)

  const handleDragOver = (e)=>{
    e.preventDefault()
    setActive(true)
  }

  const handleDragLeave = ()=>{
    setActive(false)
  }

  const handleDrop = () =>{
    starActiveTask()
    setActive(false)
  }

  return(
    <div className={`todoBlock-dropArea ${active? 'todoBlock-dropArea-active' : '' } `} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      {active? <MdAddToPhotos size={30}/> : <p className='todoBlock-dropArea-text'>drop a task here!</p>}
    </div>
  )
}

function TodoBlock(){ // ------------------------------------------------------------------------------------------------ [ TodoBlock ]
  const {groupList,todoTasks,findStaredTasks} = useContext(GlobalContext)

  useEffect(()=>{
    findStaredTasks()
  },[groupList])

  return(
    <div className='todoBlock'>

      <div className='todoBlock-head'>
        <h3 className='todoBlock-head-tittle'>Today's ToDos</h3>
      </div>

      <div className='todoBlock-body'>

        <ul className='todoBlock-taskList'>
          {todoTasks.map((task,index)=>{return(<StaredTaskCard key={index}  taskObject={task} />)})}
        </ul>

        {todoTasks.length < 4 ? <DropArea /> : <></> }
        
        
      </div>

    </div>
  )
}

export default TodoBlock