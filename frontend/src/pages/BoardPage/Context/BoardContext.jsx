import { createContext, useState,useEffect } from "react"

const GlobalContext = createContext()

import boardFetcher from "../../../axios/boardMethods.js"
import groupFetcher from "../../../axios/groupMethods.js"

function ContextBoard({children}){
  // * -------------------------------------------------- main States, used across the app
  const [groupList,setGroupList] = useState([])
  const [boardList,setBoardList] = useState([])
  const [todoTasks,setTodoTasks] = useState([])
  
  const [activeCard,setActiveCard] = useState(null)
  const [activeBoardId,setActiveBoardId] = useState(null)
  const [activeBoardTittle,setActiveBoardTittle] = useState(null)
  const [activeUser,setActiveUser] = useState(null)
  // * -----------------

  useEffect(()=>{
    console.log("--[GroupList]:")
    console.log(groupList)
    console.log("--[BoardList]:")
    console.log(boardList)

    findStaredTasks()
  },[groupList,boardList])


  const removeTask = async ()=>{ //-------------------------------------------- [REMOVE] removing a task from its group
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
    
    setGroupList(updatedGroupList)

    try {
      await groupFetcher.UPDATE(originalGroup.group_id,originalGroup)
    } catch (err) {console.log()}
  }

  const moveTask = async (groupTargetId,position)=>{ //-------------------------- [MOVE] moving tasks to other groups
    // 1) remove task from group
    let updatedGroupList = removeTask()

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


    try {
      await groupFetcher.UPDATE(groupTargetId,targetGroup)
    } catch (err) {console.log()}
  }

  const createNewTask = async (tittle,description,ownerGroup_id)=>{ //---------------------- [CREATE] create new task in a group
    //1) construct taskObject AND generate task_id
    const taskObject = {task_id: ( 't'+Date.now().toString() ) ,ownerGroup_id,tittle,description,isDone:false}

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

    try {
      await groupFetcher.UPDATE(ownerGroup_id,targetGroup)
    } catch (err) {console.log()}
  }

  const createNewGroup = async (tittle)=>{ //-------------------------------------- [CREATE] create new group
    try {
      const response = await groupFetcher.CREATE(activeBoardId,tittle)
      
      //1) construct groupObject using tittle and obtainer group_id
      const newGroup = {group_id:response.data.group_id,tittle,ownerBoard_id:activeBoardId,tasks:[]}

      //2) add to groupList and update state
      const newGroupList = [...groupList,newGroup]
      setGroupList(newGroupList)


    } catch (err) {console.log(err)}
  }

  const checkTask = async (task_id,ownerGroup_id)=>{ //---------------------- [CHECK] update task to be checked/unchecked
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

    try {
      await groupFetcher.UPDATE(ownerGroup_id,ownerGroup)
    } catch (err) {console.log()}
  }

  const findStaredTasks = ()=>{ //---------------------------------------- [FIND] find the stared tasks to render
    if(groupList.length > 0){
      const staredTasks = groupList.flatMap(group => group.tasks).filter(task => task.isStared)
      setTodoTasks(staredTasks)
    }else{setTodoTasks([])}
  }

  const starTask = async (task_id,ownerGroup_id)=>{ //------------------------------------------------- [STAR] switch the isStared property of a task
    //1)get owner group
    const ownerGroup = groupList.find(group => group.group_id === ownerGroup_id )

    //2) find the task and switch its isStared property
    ownerGroup.tasks = ownerGroup.tasks.map((task)=>{
      if(task.task_id == task_id){
        return( {...task,isStared:!task.isStared} )
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

    try {
      await groupFetcher.UPDATE(ownerGroup_id,ownerGroup)
    } catch (err) {console.log()}
  }

  const starActiveTask = async ()=>{ //------------------------------------------------- [STAR] star/unstar the active task
    //1)get owner group of activeCard
    const ownerGroup = groupList.find(group => group.group_id === activeCard.ownerGroup_id )

    //2) find the task and switch its isStared property
    ownerGroup.tasks = ownerGroup.tasks.map((task)=>{
      if(task.task_id == activeCard.task_id){
        return( {...task,isStared:!task.isStared} )
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

    try {
      await groupFetcher.UPDATE(ownerGroup.group_id,ownerGroup)
    } catch (err) {console.log()}
  }

  const deleteGroup = async (group_id) => { //------------------------------------------------- [DELETE] delete a group from groupList
    //1) filter groupList
    let updatedGroupList = groupList.filter(group=>group.group_id !== group_id)

    //2)set state and upload to DB
    setGroupList(updatedGroupList)
    findStaredTasks()

    try {
      await groupFetcher.DELETE(group_id)
    } catch (error) {console.log(err)} 
  }

  const editGroup = async (group_id,newTittle)=>{ //------------------------------------------------- [UPDATE] change group's name
    //1) find group object
    const updatedGroup = groupList.find(group => group.group_id === group_id )

    //2) update group
    updatedGroup.tittle = newTittle

    //3) update group list
    let updatedGroupList = groupList.map( group => {
      if( group.group_id === group_id ){
       return updatedGroup 
      }else{
       return group
      }
    })

    setGroupList(updatedGroupList)

    try {
      await groupFetcher.UPDATE(group_id,updatedGroup)
    } catch (err) {console.log()}
  }

  const editTask = async (task_id,ownerGroup_id,newTittle,newDescription) =>{  //------------------------------------ [UPDATE] edit a task tittle and/or description
    //1)find the ownerGroup
    const ownerGroup = groupList.find(group => group.group_id === ownerGroup_id )

    //2)find the task and edit it
    ownerGroup.tasks = ownerGroup.tasks.map((task)=>{
      if(task.task_id == task_id){
        return( {...task,tittle:newTittle,description:newDescription} )
      }else{
        return task
      }
    })

    //3)update group list
    let updatedGroupList = groupList.map( group => {
      if( group.group_id === ownerGroup_id ){
       return ownerGroup 
      }else{
       return group
      }
    })

    //4)set state and upload to DB
    setGroupList(updatedGroupList)

    try {
      await groupFetcher.UPDATE(ownerGroup_id,ownerGroup)
    } catch (err) {console.log()}
  }


  const createNewBoard = async (tittle)=>{ //----------------------------------------------- [CREATE] create new Board
    //1) construct boardObject 
    try {
      const response = await boardFetcher.CREATE(tittle)

      const newBoard = {board_id:response.data.board_id,tittle}

      //2) add to boardList AND  updat state
      const newBoardList = [...boardList,newBoard]
      setBoardList(newBoardList)

    }catch (err) {console.log(err)} 

  }

  const deleteActiveBoard = async ()=>{ //----------------------------------------------- [DELETE] deletes the active board (from activeBoardId state)
    //1) filter boardList
    let updatedBoardList = boardList.filter(board=>board.board_id !== activeBoardId)

    //2) filter groupList as well
    let updatedGroupList = groupList.filter(group=>group.ownerBoard_id !== activeBoardId)

    //3)update BoardList and GroupList state 
    setBoardList(updatedBoardList)
    setGroupList(updatedGroupList)

    //4) also update stared tasks
    findStaredTasks()

    try {
      boardFetcher.DELETE(activeBoardId)
    } catch (err) {console.log()}
  }


  return (
    <GlobalContext.Provider 
      value={{
                boardList,setBoardList,
                groupList,setGroupList,
                activeCard,setActiveCard,
                todoTasks,setTodoTasks,
                activeBoardId,setActiveBoardId,
                activeBoardTittle,setActiveBoardTittle,
                activeUser,setActiveUser,
                moveTask,
                removeTask, deleteGroup,
                createNewTask,createNewGroup,
                checkTask,
                findStaredTasks,
                starTask,starActiveTask,
                editGroup,editTask,
                createNewBoard,
                deleteActiveBoard
             }}>
      {children}
    </GlobalContext.Provider>
  )
}

export { ContextBoard, GlobalContext }