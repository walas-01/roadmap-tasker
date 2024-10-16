import React from 'react'
import { ContextBoard } from './pages/BoardPage/Context/BoardContext.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// --- Pages
import BoardPage from './pages/BoardPage/BoardPage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'

//---- Router
const router = createBrowserRouter([
  {
    path:'/',
    element:<BoardPage/>,
    errorElement:<NotFoundPage/>
  },
  {
    path:'/login',
    element:<LoginPage/>,
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