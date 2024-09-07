import { useContext, useState } from "react"
import { GlobalContext } from '../../../pages/BoardPage/Context/BoardContext.jsx'
import './CreateGroup_style.css'

import { FaPlus } from "react-icons/fa"
import { GoPlusCircle } from "react-icons/go"

function CreateGroupForm({setIsCreating}){
  const [tittle,setTittle] = useState('')

 const {createNewGroup} = useContext(GlobalContext)

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(!tittle.trim().length){return} // cancel if is empty
    createNewGroup(tittle)
    setIsCreating(false)
  }

  return(
    <form className="createGroupForm" onSubmit={handleSubmit}>
      <div className="createGroupForm-head">
        <GoPlusCircle size={25}/>
        <input type="text" autoFocus onChange={(e)=>{setTittle(e.target.value)}}/>
      </div>
    </form>
  )
}

function CreateGroupButton({isCreating,setIsCreating}){
  return(
    <button className="createGroupButton" onClick={()=>{setIsCreating(!isCreating)}}>
      <FaPlus size={26} />
    </button>
  )
}

function CreateGroup(){
  const [isCreating,setIsCreating] = useState(false)

  return(
    <>
      {
        isCreating?
        <CreateGroupForm setIsCreating={setIsCreating} />
        : <CreateGroupButton isCreating={isCreating} setIsCreating={setIsCreating}/>
      }
    </>
  ) 
}


export default CreateGroup