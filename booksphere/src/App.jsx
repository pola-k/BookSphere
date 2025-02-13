import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile"
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
      },
      {
        path:"/profile",
        element:<Profile/>,
      },
    ]
  )


  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}

