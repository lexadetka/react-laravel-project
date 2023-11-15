import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Users from "./pages/Users.jsx";
import NotFound from "./pages/NotFound.jsx";
import DefaultLayout from "./components/layouts/DefaultLayout.jsx";
import GuestLayout from "./components/layouts/GuestLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UserForm from "./pages/UserFrom.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to='/users'/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/users/new',
        element: <UserForm key='userCreate'/>
      },
      {
        path: '/users/:id',
        element: <UserForm key='userUpdate'/>
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: '/*',
    element: <NotFound/>
  },

])

export default router
