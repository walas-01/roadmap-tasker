import { useContext, useEffect,useState} from 'react'
import React from 'react'

import { GlobalContext } from './Context/BoardContext.jsx'
import './BoardPage_style.css'

import fetcher from '../../axios/axiosMethods.js'

// --------- components import
import Todo from '../../components/TodoBlock/TodoBlock.jsx'
import DeleteArea from '../../components/DeleteArea/DeleteArea.jsx'
import {Board,BoardNavigator} from '../../components/Board/Board.jsx'
import {WelcomeMsg} from '../../components/Popup/Popup.jsx'

// ----------------------------------------------------------------------------- mackup data
const des = 'lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s'

const GROUP_DATA = [
  {group_id:'a1b2c3',ownerBoard_id:'B1141711',tittle:'Introduction to React',tasks:[
    {task_id:'one123',ownerGroup_id:'a1b2c3',tittle:'Origins Of React',description:des,isDone:true,isStared:false},
    {task_id:'two234',ownerGroup_id:'a1b2c3',tittle:'Why React?',description:'',isDone:true,isStared:false},
    {task_id:'three345',ownerGroup_id:'a1b2c3',tittle:'DOM and Virtual DOM',description:des,isDone:true,isStared:true},
  ]},
  {group_id:'d4e5f6',ownerBoard_id:'B1141711',tittle:'React Basics 101',tasks:[
    {task_id:'four456',ownerGroup_id:'d4e5f6',tittle:'Basics of Components',description:des,isDone:true,isStared:false},
    {task_id:'nine91011',ownerGroup_id:'d4e5f6',tittle:'Class vs Function Components',description:des,isDone:false,isStared:false},
    {task_id:'five567',ownerGroup_id:'d4e5f6',tittle:'Props and Prop types',description:'',isDone:true,isStared:true},
    {task_id:'eight8910',ownerGroup_id:'d4e5f6',tittle:'Component comunication',description:des,isDone:false,isStared:false},
  ]},
  {group_id:'g7h8i9',ownerBoard_id:'B2282522',tittle:'Basic server, up and running!',tasks:[
    {task_id:'ten101112',ownerGroup_id:'g7h8i9',tittle:'Server with vanilla Node.js',description:des,isDone:false,isStared:true},
    {task_id:'eleven111213',ownerGroup_id:'g7h8i9',tittle:'Basic routing/paths',description:'',isDone:false,isStared:false},
    {task_id:'twelve121314',ownerGroup_id:'g7h8i9',tittle:'Postman for testing routes!',description:des,isDone:false,isStared:false}
  ]}
]

const BOARD_DATA = [
  {board_id:'B1141711',tittle:'React'},
  {board_id:'B2282522',tittle:'Express'}
]

function BoardPage(){ // --------------------------------------------------------------------------- [ BoardPage COMPONENT ]  
  const {setGroupList,boardList,setBoardList} = useContext(GlobalContext)
  const [isLoggedIn,setIsloggedIn] = useState()


  useEffect(()=>{ // ------------------- useEffect
    ////todo: THIS IS THE PART WHERE WE FETCH DATA (with axios) FROM DATABASE AND SET THE STATES
    ////todo: MUST SET BOTH THE Group STATE AND THE Board STATE
    //setGroupList(GROUP_DATA)
    //setBoardList(BOARD_DATA)

    const start = async()=>{
      try {
        const respose = await fetcher.protected()
        console.log(respose)
        setIsloggedIn(true)
      } catch (err) {
        console.log(err.response.status)
        if(err.response.status === 403){setIsloggedIn(false)}
      }
    }

    start()
  },[])

  return ( ///--------------------------- (return)
    <section className="boardPage">

      {isLoggedIn?
        <>
          <aside className="sideBar">
            <div className='innerSideBar'>

              <RoadMapTasker />

              <Todo />
              <DeleteArea />
            </div>
          </aside>

          <main className="board">
            <BoardNavigator/> 
            {boardList.length !== 0?
              <Board />:
              <WelcomeMsg/>
            }
          </main>
        </> :

        NotLoggedInCard()
      
    
      }


      



    </section>
  );
}

function RoadMapTasker(){
  //todo: this component must show the username and a logout button 
  return(
    <div className='roadMapTasker'>
      <h1>RoadMap Tasker</h1>
    </div>
  )
}

function NotLoggedInCard(){
  return(
    <div className='notLoggedIn'>
      <div className='notLoggedIn-head'>
        <h2>Welcome to RoadMapTasker!</h2>
      </div>

      <div className='notLoggedIn-body'>
        <p>Looks like you are not logged in. Register to start managing your tasks.</p>
      </div>
    </div>
  )
}



export default BoardPage