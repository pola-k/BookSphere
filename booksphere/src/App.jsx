import {createBrowserRouter, RouterProvider} from "react-router-dom"

import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Homepage from "./pages/Home/Homepage"
import List from "./pages/List/List"
import Subscription from "./pages/Subscription/subscription"
import Book from "./pages/Book/Book"
import CreatePostPage from "./pages/Create Post/create-post-page"
import Explore from "./pages/Explore/explore"
import CommentsPage from "./pages/Comments/comments-page"
import ProfilePage from "./pages/Profile/ProfilePage"
import SettingsPage from "../src/pages/settings/Settings"
import Summarizer from "./pages/Summarizer/summarizer"

export default function App() {

  const router = createBrowserRouter(
    [
      {
        path:"/",
        element:<Homepage/>,
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
        path:"/home",
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
      {
        path:"/create-post",
        element:<CreatePostPage/>,
      },
      {
        path:"/comments/:postID",
        element:<CommentsPage/>,
      },
      {
        path:"/settings",
        element:<SettingsPage/>,
      },
      {
        path:"/summarizer",
        element:<Summarizer/>,
      },
    ]
  )


  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}

