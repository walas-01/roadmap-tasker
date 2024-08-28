import { createContext, useState } from "react"

const GlobalContext = createContext()

function ContextBoard({children}){
  // * -------------------------------------------------- main States, used across the board page
  const [groupList,setGroupList] = useState([])
  const [activeCard,setActiveCard] = useState(null)


  const removeTask = ()=>{ //-------------------------------------------- removing a task from its group
    //1)get original Group
    const originalGroup =  groupList.find(group => group.group_id === activeCard.ownerGroup_id)
  
    //2)search for moved task in originalGroup and remove it from the list
    originalGroup.tasks = originalGroup.tasks.filter(task => task.task_id !== activeCard.task_id)
  
    const updatedGroupList = groupList.map( group => {
      if( group.group_id === originalGroup.group_id ){
       return originalGroup 
      }else{
       return group
      }
    })
  
    //todo: UPDATE Group TO DATA BASE
    return updatedGroupList
  }

  const moveTask = (groupTargetId,position)=>{ //-------------------------- moving tasks to other groups
    // 1) remove task from group AND update state
    let updatedGroupList = removeTask()
    setGroupList(updatedGroupList)

    //2)get target Group
    const targetGroup = groupList.find(group => group.group_id === groupTargetId )

    //3)update taskObject owner id
    const taskObject = activeCard
    taskObject.ownerGroup_id = groupTargetId

    //4)add taskObject to the new group at appropiate index
    targetGroup.tasks.splice(position,0,taskObject)

    //5)update state
    updatedGroupList = groupList.map( group => {
      if( group.group_id === targetGroup.group_id ){
       return targetGroup 
      }else{
       return group
      }
    })

    setGroupList(updatedGroupList)
    //todo: UPDATE Group TO DATA BASE
  }

  const createNewTask = (tittle,ownerGroup_id)=>{ //---------------------- create new task in a group

    //1) construct taskObject AND generate task_id
    const taskObject = {task_id:Date.now().toString(),tittle,isDone:false}

    //2)get target Group
    const targetGroup = groupList.find(group => group.group_id === ownerGroup_id )

    //3)add taskObject to the new group at appropiate index
    targetGroup.tasks.splice(targetGroup.tasks.length,0,taskObject)

    //4)update state
    let updatedGroupList = groupList.map( group => {
      if( group.group_id === targetGroup.group_id ){
       return targetGroup 
      }else{
       return group
      }
    })

    setGroupList(updatedGroupList)
    //todo: UPDATE Group TO DATA BASE
  }

  const checkTask = (task_id,ownerGroup_id)=>{ //---------------------- update task to be checked/unchecked
    //1)get owner group
    const ownerGroup = groupList.find(group => group.group_id === ownerGroup_id )


    //2) find the task and switch its isDone property
    ownerGroup.tasks = ownerGroup.tasks.map((task)=>{
      if(task.task_id == task_id){
        return( {...task,isDone:!task.isDone} )
      }else{
        return task
      }
    })

    //3) update state
    let updatedGroupList = groupList.map( group => {
      if( group.group_id === ownerGroup.group_id ){
       return ownerGroup 
      }else{
       return group
      }
    })

    setGroupList(updatedGroupList)
    //todo: UPDATE Group TO DATA BASE
  }


  return (
    <GlobalContext.Provider 
      value={{ groupList,setGroupList,
                activeCard,setActiveCard,
                moveTask,
                removeTask,
                createNewTask,
                checkTask
             }}>
      {children}
    </GlobalContext.Provider>
  )
}

export { ContextBoard, GlobalContext }