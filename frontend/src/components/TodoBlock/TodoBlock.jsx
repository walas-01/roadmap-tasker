import { useContext, useEffect } from 'react'
import './TodoBlock_style.css'
import { GlobalContext } from '../../pages/BoardPage/Context/BoardContext.jsx'

import { ImCheckboxUnchecked,ImCheckboxChecked } from "react-icons/im"
import { ImCross } from "react-icons/im"



const StaredTaskCard = ({taskObject})=>{ // -------------------------------------------- [ StaredTaskCard ]
  return(
    <li className='staredTaskCard'>
      <button className='staredTaskCard-button'> <ImCheckboxUnchecked color='white' size={22}/> </button>
      <p className='staredTaskCard-text'>{taskObject.tittle}</p>
      <button className='staredTaskCard-button removeButton'> <ImCross /> </button>
    </li>
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

        <p>drop a task here!</p>

      </div>

    </div>
  )
}

export default TodoBlock