import {useEffect,useState} from 'react'

import fetcher from '../../axios/axiosMethods.js'

import './LoginPage_style.css'
import { FaUser,FaLock } from "react-icons/fa"
import icon1 from '../../imgs/icon1.png'
import icon2 from '../../imgs/icon2.png'


function LoginPage(){ //------------------------------------------------------- [ Main Component ] -

  useEffect(()=>{

    const getU = async()=>{
      try {
        const res = await fetcher.getAllUsers()
        console.log(res.data)
      } catch (err) {console.log(err)}
    }

    getU()
  },[])


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
    console.log(registerObject)


    if(!registerObject.username){return setError('Username can not be empty')}
    if(!registerObject.email){return setError('Must provide an Email to register')}
    if(!registerObject.password){return setError('Must provide a password to register')}


    
    try {
      const data = await fetcher.register(registerObject.username,registerObject.email,registerObject.password)
      console.log(data)
      setError('Successfully registered!')
    } catch (err) {
      console.log(err)
    setError('Woops! There was an error')
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

      <div>
        <p>{error}</p>
      </div>

      <div className='panel-form-button-container'>
        <button type='submit'>Sign Up</button>
      </div>
    </div>
    </form>
  )
}

function LoginForm(){ //------------------------------------- [ LOGIN ] -
  return (
    <form className="panel-form loginForm">
      <div className="panel-form-head">
        <h3>Login</h3>
        <img src={icon2} alt="sign in icon" />
      </div>

      <div className="panel-form-body">
        <div className="panel-form-input">
          <FaUser size={30} className="input-icon" /><input type="text" placeholder="Email" />
        </div>

        <div className="panel-form-input">
          <FaLock size={30} className="input-icon" /><input type="password" placeholder="Password" />
        </div>

        <div className="panel-form-button-container">
          <button>Login</button>
        </div>
      </div>
    </form>
  )
}

export default LoginPage