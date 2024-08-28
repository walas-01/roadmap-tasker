import { useContext, useEffect} from 'react'
import React from 'react'
import GroupCard from '../../components/GroupCard/GroupCard.jsx'
import { GlobalContext } from './Context/BoardContext.jsx'

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

function BoardPage(){ // --------------------------------------------------------------------------- [ BoardPage COMPONENT ]  
  const {groupList,setGroupList} = useContext(GlobalContext)

  
  useEffect(()=>{ // ------------------- useEffect
    ////todo: THIS IS THE PART WHERE WE FETCH DATA (with axios) FROM DATABASE AND SET THE STATES
    setGroupList(GROUP_DATA)

    console.log("[ GroupList ] --------------------")
    console.log(groupList)
  },[groupList])


  return ( ///--------------------------- (return)
    <main className="boardPage">
      <section className="sideBar">
        <DeleteArea />
      </section>

      <section className="board">
        {groupList.map((group, index) => {
          return (
            <GroupCard
              key={index}
              groupObject={group}
            />
          );
        })}
      </section>
    </main>
  );
}


export default BoardPage