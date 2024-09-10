import { useContext, useState, useEffect,useRef } from "react"
import { GlobalContext } from '../../../pages/BoardPage/Context/BoardContext.jsx'
import './CreateGroup_style.css'

import { FaPlus } from "react-icons/fa"
import { GoPlusCircle } from "react-icons/go"

function CreateGroupForm({setIsCreating}){
  const [tittle,setTittle] = useState('')

  const {createNewGroup} = useContext(GlobalContext)

  const formRef = useRef(null); // ------------------------------------------ cancel on blur
  useEffect(() => { 
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsCreating(false); 
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(!tittle.trim().length){ // cancel if is empty
      setIsCreating(false)
      return
    } 
    if(tittle.length > 50){
      alert("Group's Tittle can not have more than a 50 characters!")
      return
    }

    createNewGroup(tittle)
    setIsCreating(false)
  }

  return(
    <form className="createGroupForm" ref={formRef} onSubmit={handleSubmit}>
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