import { useContext, useEffect} from 'react'
import React from 'react'
import GroupCard from '../../components/GroupCard/GroupCard.jsx'
import { GlobalContext } from './Context/BoardContext.jsx'

import './BoardPage_style.css'

// --------- components import
import Todo from '../../components/TodoBlock/TodoBlock.jsx'
import DeleteArea from '../../components/DeleteArea/DeleteArea.jsx'

// ----------------------------------------------------------------------------- mackup data
const des = 'lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s'

const GROUP_DATA = [
  {group_id:'a1b2c3',tittle:'Introduction to React',tasks:[
    {task_id:'one123',ownerGroup_id:'a1b2c3',tittle:'Origins Of React',description:des,isDone:true,isStared:false},
    {task_id:'two234',ownerGroup_id:'a1b2c3',tittle:'Why React?',description:'',isDone:true,isStared:false},
    {task_id:'three345',ownerGroup_id:'a1b2c3',tittle:'DOM and Virtual DOM',description:des,isDone:true,isStared:false},
  ]},
  {group_id:'d4e5f6',tittle:'React Basics 101',tasks:[
    {task_id:'four456',ownerGroup_id:'d4e5f6',tittle:'Basics of Components',description:des,isDone:true,isStared:true},
    {task_id:'nine91011',ownerGroup_id:'d4e5f6',tittle:'Class vs Function Components',description:des,isDone:false,isStared:false},
    {task_id:'five567',ownerGroup_id:'d4e5f6',tittle:'Props and Prop types',description:'',isDone:true,isStared:true},
    {task_id:'eight8910',ownerGroup_id:'d4e5f6',tittle:'Component comunication',description:des,isDone:false,isStared:false},
  ]},
  {group_id:'g7h8i9',tittle:'React Hooks Basics',tasks:[
    {task_id:'six678',ownerGroup_id:'g7h8i9',tittle:'React Hooks and how to use them',description:'',isDone:false,isStared:true},
    {task_id:'seven789',ownerGroup_id:'g7h8i9',tittle:'UseState: state and setState',description:des,isDone:false,isStared:false},
  ]},
]

function BoardPage(){ // --------------------------------------------------------------------------- [ BoardPage COMPONENT ]  
  const {groupList,setGroupList,findStaredTasks} = useContext(GlobalContext)

  useEffect(()=>{ // ------------------- useEffect
    ////todo: THIS IS THE PART WHERE WE FETCH DATA (with axios) FROM DATABASE AND SET THE STATES
    setGroupList(GROUP_DATA)
  },[])


  return ( ///--------------------------- (return)
    <main className="boardPage">
      <section className="sideBar">
        <div className='innerSideBar'>
          <Todo />
          <DeleteArea />
        </div>
      </section>

      <section className="board">
        {groupList.map( group => {
          return (
            <GroupCard
              key={group.group_id}
              groupObject={group}
            />
          );
        })}
      </section>





    </main>
  );
}


export default BoardPage