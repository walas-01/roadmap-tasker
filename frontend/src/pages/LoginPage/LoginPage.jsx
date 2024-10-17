import {useEffect,useState} from 'react'

import userFetcher from '../../axios/userMethods.js'
import {useNavigate} from 'react-router-dom'

import './LoginPage_style.css'
import { FaUser,FaLock } from "react-icons/fa"
import icon1 from '../../imgs/icon1.png'
import icon2 from '../../imgs/icon2.png'


function LoginPage(){ //------------------------------------------------------- [ Main Component ] -
  return(
    <section className='loginPage' >
      <div className='panel'>
        <div className='panel-head'>
          <h2>Welcome to RoadMapTasker!</h2>
        </div>

        <div className='panel-body'>

          <SignInForm/>

          <LoginForm/>

        </div>

      </div>
    </section>
  )
}


function SignInForm(){ //------------------------------------- [ SIGN IN ] -

  const [registerObject,setRegisterObject] = useState({})
  const [error,setError] = useState('')

  //event handlers

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(!registerObject.username){return setError('Username can not be empty')}
    if(!registerObject.email){return setError('Must provide an Email to register')}
    if(!registerObject.password){return setError('Must provide a password to register')}

    try {
      const data = await userFetcher.register(registerObject.username,registerObject.email,registerObject.password)
      console.log(data)
      setError('Successfully registered!')
    } catch (err) {
      console.log(err.response)
      if(err.response.data.message){setError(err.response.data.message)}
      if(err.response.data.error){setError(err.response.data.error)}
    }
  }


  return(
    <form className='panel-form registerForm' onSubmit={handleSubmit}>

    <div className='panel-form-head'>
      <h3>Sign Up</h3>
      <img src={icon1} alt="sign in icon" />
    </div>

    <div className='panel-form-body'>

      <div className='panel-form-input'>
        <FaUser size={30} className='input-icon'/> <input type="text" placeholder='Username' onChange={(e)=>{setRegisterObject({...registerObject, username:e.target.value })}} />
      </div>

      <div className='panel-form-input'>
        <FaUser size={30} className='input-icon'/> <input type="text" placeholder='Email' onChange={(e)=>{setRegisterObject({...registerObject, email:e.target.value })}}/>
      </div>

      <div className='panel-form-input'>
        <FaLock size={30} className='input-icon'/><input type="password" placeholder='Password' onChange={(e)=>{setRegisterObject({...registerObject, password:e.target.value })}}/>
      </div>

      { error.length > 1 ?
          <div className={`panel-errorArea ${error === 'Successfully registered!' ? 'errorArea-active' : ''}`} >
            <p>{error}</p>
          </div> :''
        }

      <div className='panel-form-button-container'>
        <button type='submit'>Sign Up</button>
      </div>
    </div>
    </form>
  )
}




function LoginForm(){ //------------------------------------- [ LOGIN ] -
  const [loginObject,setLoginObject] = useState({})
  const [error,setError] = useState('')

  const navigator = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(!loginObject.email){return setError('Must provide an Email to login')}
    if(!loginObject.password){return setError('Must provide a password to login')}

    try {
      const response = await userFetcher.login(loginObject.email,loginObject.password)
      console.log(response.data)


      setError('Ok!')
      navigator('/')
    } catch (err) {
      console.log(err.response)
      if(err.response && err.response.data.message){setError(err.response.data.message)}
    }
  }

  return (
    <form className="panel-form loginForm" onSubmit={handleSubmit}>
      <div className="panel-form-head">
        <h3>Log In</h3>
        <img src={icon2} alt="sign in icon" />
      </div>

      <div className="panel-form-body">
        <div className="panel-form-input">
          <FaUser size={30} className="input-icon" /><input type="text" placeholder="Email" onChange={(e)=>{setLoginObject({...loginObject,email:e.target.value})}} />
        </div>

        <div className="panel-form-input">
          <FaLock size={30} className="input-icon" /><input type="password" placeholder="Password" onChange={(e)=>{setLoginObject({...loginObject,password:e.target.value})}} />
        </div>

        { error.length > 1 ?
          <div className={`panel-errorArea ${error === 'Ok!' ? 'errorArea-active' : ''}`} >
            <p>{error}</p>
          </div> :''
        }


        <div className="panel-form-button-container">
          <button type='submit'>Log In</button>
        </div>
      </div>
    </form>
  )
}

export default LoginPage