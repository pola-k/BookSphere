import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Home from "./pages/Home/Home"
import Homepage from "./pages/Homepage/Homepage"
import List from "./pages/List/List"
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
        path:"/homepage",
        element:<Homepage/>,
      },
      {
        path:"/list",
        element:<List/>,
      },
    ]
  )


  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}

