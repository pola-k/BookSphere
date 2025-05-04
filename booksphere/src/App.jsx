import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Homepage from "./pages/Home/Homepage";
import List from "./pages/List/List";
import Subscription from "./pages/Subscription/subscription";
import Book from "./pages/Book/Book";
import CreatePostPage from "./pages/Create Post/create-post-page";
import Explore from "./pages/Explore/explore";
import CommentsPage from "./pages/Comments/comments-page";
import ProfilePage from "./pages/Profile/ProfilePage";
import SettingsPage from "../src/pages/settings/Settings";
import Summarizer from "./pages/Summarizer/summarizer";
import ProtectedRoute from "./components/protected_routes";
import SavedPostsPage from "./pages/savedpages.jsx"; // ✅ correct
export default function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Homepage /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/home", element: <Homepage /> },
    { path: "/list", element: <List /> },
    {
      path: "/subscription",
      element: (
        <ProtectedRoute>
          <Subscription />
        </ProtectedRoute>
      ),
    },
    { path: "/book/:id", element: <Book /> },
    { path: "/explore", element: <Explore /> },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/create-post",
      element: (
        <ProtectedRoute>
          <CreatePostPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/comments/:postID",
      element: (
        <ProtectedRoute>
          <CommentsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/summarizer",
      element: <Summarizer />,
    },
    {
      path: "/saved", // ✅ new route
      element: (
        <ProtectedRoute>
          <SavedPostsPage />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
