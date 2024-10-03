import './Popup_style.css'

import roadImg from '../../imgs/roadIcon1.png'

import { FaTrashCan } from "react-icons/fa6"


function CreateBoardPopup({controlState,tittleState,func}){

  // event handlers

  const handleCancel = ()=>{
    controlState(false)
  }

  const handleOkButton = ()=>{
    func()
  }

  const handleOnChange = (e)=>{
    tittleState(e.target.value)
  }


  return(
    <div className='popup-container'>

      <div className='boardPopup'>
        <div className='boardPopup-head'>
          <h2>Create Board</h2>
        </div>
        <div className='boardPopup-body'>
          <input type="text" placeholder='board name' onChange={handleOnChange}/>
          <div className='boardPopup-buttons'>
            <button className='boardPopup-cancelButton' onClick={handleCancel}>Cancel</button>
            <button className='boardPopup-deleteButton'onClick={handleOkButton}>Create</button>
          </div>
        </div>
      </div>

    </div>

  )
}


function WelcomeMsg(){
  return(
    <div className='welcomeMsg'>
      <img src={roadImg} alt="road icon" />
      <div className='welcomeMsg-text'>
        <h3>Welcome to RoadMap Tasker!</h3>
        <p>You can start by creating a new Board using the <span>+</span> button above.</p>
      </div>

    </div>
  )
}


function Popup({btn1,btn2,func,tittle,text,controlState}){
  const handleButton1 = ()=>{
    controlState(false)
  }
  const handleButton2 = ()=>{
    func()
    controlState(false)
  }
  return(
    <div className='popup-container'>

      <div className='popup'>
        <div className='popup-head'>
          <h2>{tittle}</h2>
        </div>
        <div className='popup-body'>
          <p>{text}</p>
          <div className='popup-buttons'>
            <button className='popup-cancelButton' onClick={handleButton1}>{btn1}</button>
            <button className='popup-deleteButton'onClick={handleButton2}><FaTrashCan size={18}/>{btn2}</button>
          </div>
        </div>
      </div>

    </div>
  )
}



export {Popup,WelcomeMsg,CreateBoardPopup}