import { useState,useContext, useEffect } from 'react'
import { GlobalContext } from '../../pages/BoardPage/Context/BoardContext.jsx'
import './Board_style.css'

import { FaPlus } from "react-icons/fa"
import roadImg from '../../imgs/roadIcon2.png'

import GroupCard from '../GroupCard/GroupCard.jsx'
import CreateGroup from '../GroupCard/CreateGroup/CreateGroup.jsx'
import { CreateBoardPopup, Popup } from '../Popup/Popup.jsx'


function BoardNavigator(){ // --------------------------------------- [ BoardNavigator ] -
  const {boardList,setActiveBoardId,createNewBoard,setActiveBoardTittle} = useContext(GlobalContext)
  const [currentTab,setCurrentTab] = useState(0)
  const [isCreatingBoard,setIsCreatingBoard] = useState(false)
  const [boardTittle,setBoardLittle] = useState('')

  useEffect(()=>{
    if(boardList.length !== 0){
      setActiveBoardId(boardList[0].board_id)
      setActiveBoardTittle(boardList[0].tittle)
    }
  },[boardList])

  
  const returnNavButtons = ()=>{
    if(boardList){
      return( 
        boardList.map((board,index)=>{
          return <p key={board.board_id} className={index === currentTab ? 'navLinkActive' : '' } onClick={()=>{handleNavClick(index)}} >
            {board.tittle}
          </p>
        })
      )
    }else{
      return ('')
    }
    
  }

  const createBoard = ()=>{
    if(boardTittle === ''){return alert("Board's tittle can not be empty")}
    if(boardTittle.length < 3){return alert("Board's tittle can not have less than 3 characters")}
    if(boardTittle.length > 16){return alert("Board's tittle can not have more than 16 characters")}

    createNewBoard(boardTittle)
    setIsCreatingBoard(false)
  }

  // ------- event handlers

  const handleNavClick = (index)=>{
    setCurrentTab(index)
    setActiveBoardId(boardList[index].board_id)
    setActiveBoardTittle(boardList[index].tittle)
  }

  const handleCreateClick = ()=>{
    setIsCreatingBoard(!isCreatingBoard)
  }

  return(
    <>
      <nav className="boardNav"> 
        <div className='boardNav-linksContainer'>

          { returnNavButtons() }

          {
            boardList.length >=6? '' :
            <button className='boardNav-createButton' onClick={handleCreateClick}>
              <FaPlus/>
            </button>

          }
        </div>
      </nav>
    
      {isCreatingBoard? <CreateBoardPopup controlState={setIsCreatingBoard} tittleState={setBoardLittle} func={createBoard}/> : ''}
    </>
  )
}



function Board(){
  const {groupList,activeBoardId,deleteActiveBoard,activeBoardTittle} = useContext(GlobalContext)
  const [myGroupList,setMyGroupList] = useState([])

  const [isDeletingBoard,setIsDeletingBoard] = useState(false)

  useEffect(()=>{
    // filters the groupList to have an ownerBoard_id
    // iqual to seleceted board (BoardNavigator) 
    setMyGroupList( groupList.filter(group=>group.ownerBoard_id === activeBoardId) )
  },[activeBoardId,groupList])

  const handleDeleteBoard = ()=>{
    setIsDeletingBoard(!isDeletingBoard)
  }

  return (
    <>
      <div className="boardMsg">
        <img src={roadImg} alt="road icon" />
        <div className="boardMsg-text">
          <h3>{activeBoardTittle}</h3>
          <button onClick={handleDeleteBoard} >Delete Board</button>
        </div>
      </div>

      {myGroupList.map((group) => {
        return <GroupCard key={group.group_id} groupObject={group} />;
      })}

      <CreateGroup />

      {isDeletingBoard? <Popup btn1='Cancel'btn2='Delete' tittle='Delete Board' text='Deleting a Board can not be undone' func={deleteActiveBoard} controlState={setIsDeletingBoard} /> : ''}
    </>
  );
} 

export {BoardNavigator,Board}