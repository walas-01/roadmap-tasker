import { useEffect, useState, createContext} from 'react'
import React from 'react'
import GroupCard from '../../components/GroupCard/GroupCard.jsx'

import './BoardPage_style.css'

// --------- components import
import Todo from '../../components/TodoBlock/TodoBlock.jsx'
import DeleteArea from '../../components/DeleteArea/DeleteArea.jsx'

// ----------------------------------------------------------------------------- mackup data
const GROUP_DATA = [
  {group_id:'a1b2c3',tittle:'Introduction to React',tasks:[
    {task_id:'one123',ownerGroup_id:'a1b2c3',tittle:'Origins Of React',isDone:true},
    {task_id:'two234',ownerGroup_id:'a1b2c3',tittle:'Why React?',isDone:true},
    {task_id:'three345',ownerGroup_id:'a1b2c3',tittle:'DOM and Virtual DOM',isDone:true},
  ]},
  {group_id:'d4e5f6',tittle:'React Basics 101',tasks:[
    {task_id:'four456',ownerGroup_id:'d4e5f6',tittle:'Components',isDone:false},
    {task_id:'five567',ownerGroup_id:'d4e5f6',tittle:'Props and Prop types',isDone:true},
  ]},
  {group_id:'g7h8i9',tittle:'React Hooks Basics',tasks:[
    {task_id:'six678',ownerGroup_id:'g7h8i9',tittle:'UseState',isDone:false},
    {task_id:'seven789',ownerGroup_id:'g7h8i9',tittle:'UseEffect',isDone:false},
  ]},
]


const Context = createContext(); // create the context to be provided


function BoardPage(){ // --------------------------------------------------------------------------- [ BoardPage COMPONENT ]
  const [groupList,setGroupList] = useState(GROUP_DATA)
  
  ////todo: THIS IS THE PART WHERE WE FETCH DATA (with axios) FROM DATABASE AND SET THE STATES
  
  const [activeCard,setActiveCard] = useState(null)

  //? ----------------------------- methods

  const removeTask = ()=>{ //------------------------------------- removing a task from its group
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

  
  const moveTask = (groupTargetId,position)=>{ //--------------------- moving tasks to other groups
    // 1) remove task from group AND update state
    let updatedGroupList = removeTask()
    setGroupList(updatedGroupList)

    //2)get target Group
    const targetGroup = groupList.find(group => group.group_id === groupTargetId )
    console.log(targetGroup)

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
  }

  
  const createNewTask = (tittle,ownerGroup_id)=>{ //-------- create new task in a group

    //1) construct taskObject AND generate task_id
    const taskObject = {task_id:Date.now().toString(),tittle,ownerGroup_id}

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
  }

  useEffect(()=>{ // ------------------- useEffect
    console.log(groupList)
  },[groupList])

  return (
    <Context.Provider value={{moveTask}} >
      <main className="boardPage">

        <section className="sideBar">
          <DeleteArea activeCard={activeCard} removeTask={removeTask}/>
        </section>

        <section className="board">
          {groupList.map((group, index) => {
            return (
              <GroupCard
                key={index}
                groupObject={group}
                setActiveCard={setActiveCard}
                createNewTask={createNewTask}
              />
            );
          })}
        </section>

      </main>
    </Context.Provider>
  );
}


export { BoardPage, Context}