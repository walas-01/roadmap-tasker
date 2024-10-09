import axios from 'axios'


const fetcher = {}


fetcher.getAllUsers = async()=>{
  let getUsersCFG = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:4001/api/users',
  }
  try {
    const data = await axios.request(getUsersCFG)
    return data
  } catch (err) {console.log()}
}


fetcher.register = async(username,email,password)=>{ //----------- [ register ] -
  let registerConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:4001/api/register',
    headers: {
      'Content-Type': 'application/json'
    },
    data : JSON.stringify({username,email,password})
  }

  try {
    const data = await axios.request(registerConfig)
    return data
  } catch (err) {throw err}
}



fetcher.login = async(email,password)=>{ //-------------- [ login ] -
  let loginConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    withCredentials:true,
    url: 'http://localhost:4001/api/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data : JSON.stringify({email,password})
  }

  try {
    const data = await axios.request(loginConfig)
    return data
  } catch (err) {
    throw err
  }
}


fetcher.protected = async()=>{ //-------------- [ protected ] -
  let protectedConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    withCredentials:true,
    url: 'http://localhost:4001/api/protected',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }

  try {
    const response = await axios.request(protectedConfig)
    return response
  } catch (err) {
    throw err
  }
}



export default fetcher