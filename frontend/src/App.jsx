import React from 'react'
import { ContextBoard } from './pages/BoardPage/Context/BoardContext.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// --- Pages
import BoardPage from './pages/BoardPage/BoardPage.jsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'

//---- Router
const router = createBrowserRouter([
  {
    path:'/board',
    element:<BoardPage/>,
    errorElement:<NotFoundPage/>
  }
])

function App(){

  return(
    <ContextBoard>
      <RouterProvider router={router}/>
    </ContextBoard>
  )
}


export default App