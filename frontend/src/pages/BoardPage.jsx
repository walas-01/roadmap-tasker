import { useState } from 'react'
import GroupCard from '../components/GroupCard/GroupCard.jsx'

import './BoardPage_style.css'




// --------- components import
import Todo from '../components/Todo/Todo.jsx'



// --------- mackup data
const GROUP_DATA = [
  {id:'a1b2c3',tittle:'React Introduction'},
  {id:'d4e5f6',tittle:'React Basics 101'},
  {id:'g7h8i9',tittle:'React Hooks Basics'}
]

const TASK_DATA = [
  {id:'one123',tittle:'Origins Of React',groupId:'a1b2c3'},
  {id:'two234',tittle:'Why React?',groupId:'a1b2c3'},
  {id:'three345',tittle:'DOM and Virtual DOM',groupId:'a1b2c3'},
  {id:'four456',tittle:'Components',groupId:'d4e5f6'},
  {id:'five567',tittle:'Props and Prop types',groupId:'d4e5f6'},
  {id:'six678',tittle:'UseState',groupId:'g7h8i9'},
  {id:'seven789',tittle:'UseEffect',groupId:'g7h8i9'},
]


function BoardPage(){
  const [taskList,setTaskList] = useState(TASK_DATA)
  const [groupList,setGroupList] = useState(GROUP_DATA)
  

  return(
    <main className='boardPage'>

    <section className='sideBar'>
      
      <Todo/>

    </section>



    <section className='board'>
      {groupList.map((group,index)=>{return <GroupCard key={index} tittle={group.tittle} id={group.id} taskList={taskList}/>})}

    </section>

    </main>
  )
}


export default BoardPage