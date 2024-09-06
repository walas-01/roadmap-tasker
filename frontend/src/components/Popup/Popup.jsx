import './Popup_style.css'

import { FaTrashCan } from "react-icons/fa6"

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



export default Popup