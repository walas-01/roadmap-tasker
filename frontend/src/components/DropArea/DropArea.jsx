

import { useState } from 'react'
import './DropArea_style.css'

function DropArea({groupId,position,moveTask}){

  const [active,setActive] = useState(false)

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