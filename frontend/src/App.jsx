import React from 'react'
import { ContextBoard } from './pages/BoardPage/Context/BoardContext.jsx'


// --- Pages
import { BoardPage } from './pages/BoardPage/BoardPage.jsx'


function App(){

  return(
    <ContextBoard>
      <BoardPage/>
    </ContextBoard>
  )
}


export default App