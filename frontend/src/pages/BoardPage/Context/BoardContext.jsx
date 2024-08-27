import { createContext, useContext, useState } from "react"


const Context = createContext()







function ContextBoard({child}){

  const [groupList,setGroupList] = useContext([])


  return (
    <Context.Provider value={{}}>
      {child}
    </Context.Provider>
  )
}

export default ContextBoard