import axios from 'axios'

const userFetcher = {}

userFetcher.register = async(username,email,password)=>{ //----------- [ register ] -
  let registerConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: (import.meta.env.VITE_SERVER_URL,'/api/register'),
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
    url: (import.meta.env.VITE_SERVER_URL,'/api/login'),
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
    url: (import.meta.env.VITE_SERVER_URL,'/api/logout'),
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