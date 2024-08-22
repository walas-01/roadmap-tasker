import { useState } from 'react'
import GroupCard from '../components/GroupCard/GroupCard.jsx'

import './BoardPage_style.css'




// --------- components import
import Todo from '../components/Todo/Todo.jsx'
import DeleteArea from '../components/DeleteArea/DeleteArea.jsx'


// --------- mackup data
const GROUP_DATA = [
  {id:'a1b2c3',tittle:'React Introduction',tasks:[
    {id:'one123',tittle:'Origins Of React'},
    {id:'two234',tittle:'Why React?'},
    {id:'three345',tittle:'DOM and Virtual DOM'},
  ]},
  {id:'d4e5f6',tittle:'React Basics 101',tasks:[
    {id:'four456',tittle:'Components'},
    {id:'five567',tittle:'Props and Prop types'},
  ]},
  {id:'g7h8i9',tittle:'React Hooks Basics',tasks:[
    {id:'six678',tittle:'UseState',groupId:'g7h8i9'},
    {id:'seven789',tittle:'UseEffect',groupId:'g7h8i9'},
  ]}
]

function BoardPage(){
  const [groupList,setGroupList] = useState(GROUP_DATA)
  
  //? THIS IS THE PART WHERE WE FETCH DATA (with axios) FROM DATABASE AND SET THE STATES
  const [activeCardId,setActiveCard] = useState(null)

  // moving tasks to other groups
  const moveTask = (taskId,position)=>{
    console.log(`[Board]: moviendo task: '${activeCardId}' a groupId: ${taskId} a posición: ${position}`)
  }

  return(
    <main className='boardPage'>

      <section className='sideBar'>
        
        <DeleteArea activeCard={activeCardId}/>

      </section>

      <section className='board'>
        {groupList.map((group,index)=>{
          return (

            <GroupCard 
              key={index}
              groupObject={group}
              setActiveCard={setActiveCard}
              moveTask={moveTask}
            />

          )})}
      </section>
    </main>
  )
}


export default BoardPage