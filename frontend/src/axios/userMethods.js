import axios from 'axios'


const userFetcher = {}


userFetcher.getAllUsers = async()=>{
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


userFetcher.register = async(username,email,password)=>{ //----------- [ register ] -
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



userFetcher.login = async(email,password)=>{ //-------------- [ log in ] -
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

userFetcher.logout = async()=>{ //-------------- [ log out ] -
  let logoutConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    withCredentials:true,
    url: 'http://localhost:4001/api/logout',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const data = await axios.request(logoutConfig)
    return data
  } catch (err) {
    throw err
  }
}

export default userFetcher