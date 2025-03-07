import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Home from "./pages/Home/Home"
import Homepage from "./pages/Homepage/Homepage"
import List from "./pages/List/List"
import Subscription from "./pages/Subscription/subscription"
import Book from "./pages/Book/Book"
import Explore from "./pages/Explore/explore"
import ProfilePage from "./pages/Profile/ProfilePage"
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
      {
        path:"/subscription",
        element:<Subscription/>,
      },
      {
        path:"/book/:id",
        element:<Book/>,
      },
      {
        path:"/explore",
        element:<Explore/>,
      },
      {
        path:"/profile",
        element:<ProfilePage/>,
      },
    ]
  )


  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}

