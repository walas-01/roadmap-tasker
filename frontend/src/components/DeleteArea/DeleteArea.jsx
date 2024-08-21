import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6"
import { FaRegTrashCan } from "react-icons/fa6";

import './DeleteArea_style.css'

function DeleteArea({activeCard}){
  const [active,setActive] = useState(false)

  //------------------ event handlers
  const handleDragOver = (e)=>{
    e.preventDefault()
    setActive(true)
  }

  const handleDragLeave = (e)=>{
    console.log("[delete]: leave!!")
    setActive(false)
  }

  const handleDrop = (e)=>{
    console.log('[daleteArea]: i want to delete ', activeCard)
    setActive(false)
  }

  return(
    <div 
      className={`deleteArea ${active?'active':'inactive'}`} 
      onDragOver={handleDragOver} 
      onDragLeave={handleDragLeave} 
      onDrop={handleDrop}>
      {active ?
        <FaTrashCan size={35} color="221622"/> :
        <FaRegTrashCan size={35} color="E23838" /> 
      }
    </div>
  )
}

export default DeleteArea