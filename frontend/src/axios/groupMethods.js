import axios from 'axios'

const groupFetcher = {}

groupFetcher.GET = async()=>{ //---------------------------------- [ get groups ] -
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:4001/api/group',
    withCredentials:true,
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

groupFetcher.CREATE = async(ownerBoard_id,tittle)=>{ //--------------------- [ create group ] -
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:4001/api/group',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    },
    data : JSON.stringify({ownerBoard_id,tittle})
  }

  try {
    const response = await axios.request(config)
    return response
  } catch (err) {
    throw err
  }
}

export default groupFetcher