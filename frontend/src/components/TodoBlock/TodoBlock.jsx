import { useContext, useEffect } from 'react'
import './TodoBlock_style.css'
import { GlobalContext } from '../../pages/BoardPage/Context/BoardContext.jsx'

import { ImCheckboxUnchecked,ImCheckboxChecked } from "react-icons/im"
import { ImCross } from "react-icons/im"

const StaredTaskCard = ({taskObject})=>{
  return(
    <li className='staredTaskCard'>
      <button className='staredTaskCard-button'> <ImCheckboxUnchecked color='white' size={22}/> </button>
      <div>
        <p>{taskObject.tittle}</p>
      </div>
      <button className='staredTaskCard-button removeButton'> <ImCross /> </button>
    </li>
  )
}



function TodoBlock(){
  const {todoTasks} = useContext(GlobalContext)

  return(
    <div className='todoCard'>

      <h3 className='todoCard-tittle'>Today's ToDos</h3>

      <div className='todoCard-body'>

        <ul className='todoCard-taskList'>
          {todoTasks.map((task,index)=>{return(<StaredTaskCard key={index}  taskObject={task} />)})}
        </ul>

        <p>drop a task here!</p>

      </div>

    </div>
  )
}

export default TodoBlock