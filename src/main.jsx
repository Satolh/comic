import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter,Link} from 'react-router-dom'

import App from './App.jsx'
import '../src/styles/App.css'
import "../src/styles/notFoundPageStyle.css"

import NotFoundPage from './routes/NotFoundPage.jsx'
import PageCharacterProfile from './routes/PageCharacterProfile.jsx'
import PageCharacters from './routes/PageCharacters.jsx'
import PageComicInfo from './routes/PageComicInfo.jsx'
import PageComics from "./routes/PageComics.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: "PageCharacters",
    element: <PageCharacters/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: "PageComics",
    element: <PageComics/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: "PageCharacterProfile",
    element: <PageCharacterProfile/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: "PageComicInfo",
    element: <PageComicInfo/>,
    errorElement: <NotFoundPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />
)
