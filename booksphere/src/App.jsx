import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import Home from "./components/Home/Home"
import {createBrowserRouter, RouterProvider} from "react-router-dom"

export default function App() {

  const router = createBrowserRouter(
    [
      {
        path:"/",
        element:<Home/>,
      },
      {
        path:"/login",
        element:<Login/>, 
      },
      {
        path:"/signup",
        element:<Signup/>,
      }
    ]
  )


  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}

