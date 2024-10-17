import axios from 'axios'

const boardFetcher = {}

boardFetcher.GET = async()=>{ //---------------------------------- [ get boards ] -
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    withCredentials:true,
    url: (import.meta.env.VITE_SERVER_URL,'/api/board'),
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
    url: (import.meta.env.VITE_SERVER_URL,'/api/board'),
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


boardFetcher.DELETE = async(board_id)=>{ //--------------------- [ delete a board ] -
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    withCredentials: true,
    url: (import.meta.env.VITE_SERVER_URL,'/api/board'),
    headers: {
      'Content-Type': 'application/json'
    },
    data : JSON.stringify({board_id:board_id})
  }

  try {
    const response = await axios.request(config)
    return response
  } catch (err) {
    throw err
  }

}



export default boardFetcher