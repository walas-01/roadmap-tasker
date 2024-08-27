import { useState, useContext } from 'react'
import './DropArea_style.css'
import {Context} from '../../pages/BoardPage/BoardPage.jsx'

function DropArea({groupId,position}){
  const [active,setActive] = useState(false)
  const {moveTask} = useContext(Context)


  //------------------ event handlers
  const handleDragOver = (e)=>{
    e.preventDefault()
    setActive(true)
  }
  const handleDragLeave = (e)=>{
    setActive(false)
  }
  const handleDrop = (e)=>{
    moveTask(groupId,position)
    setActive(false)
  }

  return(
    <div className={active? 'dropArea-active' : 'dropArea'}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >

    </div>
  )
}

export default DropArea