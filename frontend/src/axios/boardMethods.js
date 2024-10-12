import axios from 'axios'

const boardFetcher = {}

boardFetcher.GET = async()=>{ //---------------------------------- [ get boards ] -
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    withCredentials:true,
    url: 'http://localhost:4001/api/board',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await axios.request(config)
    return response
  } catch (err) {
    throw err
  }
}


boardFetcher.CREATE = async(tittle)=>{ //--------------------- [ create board ] -
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    withCredentials: true,
    url: 'http://localhost:4001/api/board',
    headers: {
      'Content-Type': 'application/json'
    },
    data : JSON.stringify({tittle:tittle})
  }

  try {
    const response = await axios.request(config)
    return response
  } catch (err) {
    throw err
  }
}





export default boardFetcher