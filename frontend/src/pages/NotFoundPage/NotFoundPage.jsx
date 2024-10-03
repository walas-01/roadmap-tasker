import './NotFoundPage_style.css'
import { useNavigate } from 'react-router-dom'

function NotFoundPage(){
  const navigator = useNavigate()

  const handleClick = ()=>{
    navigator(-1)
  }

  return(
    <div className="notFoundPage">
      <div className='notFoundCard'>

        <div className='notFoundCard-head'>
          <h2>Not Found 404</h2>
        </div>

        <div className='notFoundCard-body'>
          <p>You got far from home, buddy</p>
          <button className='notFoundCard-backButton' onClick={handleClick}>Go back</button>
        </div>

      </div>
    </div>
  )
}


export default NotFoundPage