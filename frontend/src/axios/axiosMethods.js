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
  } catch (err) {console.log(err)}
}

export default fetcher