import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout, MasterLayout, NotFound, ProtectedRoute } from '@/SharedModule/Components'
import Home from './HomeModule/Components/Home/Home'
import UsersList from './UsersModule/Components/UsersList/UsersList'
import CategoriesList from './CategoriesModule/Components/CategoriesList/CategoriesList'
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList'
import { useEffect, useState } from 'react'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import {  Login, ResetPass, ResetPassRequest } from '@/AuthModule/Components'

export const togglePass = () => {
  const eyeIcon = document.querySelector('.show') as HTMLElement;
  const passInput = document.querySelector('.pass') as HTMLInputElement;
  if (passInput && eyeIcon) {
    passInput.type = (passInput?.type === 'password') ? 'text' : 'password';
    eyeIcon.classList.toggle('fa-eye');
    eyeIcon.classList.toggle('fa-eye-slash');
  }
};


function App() {


  const [adminData, setAdminData] = useState<JwtPayload | null>(null)

  const saveAdminData = () => {
    let encodedToken = localStorage.getItem('adminToken')
    if (encodedToken) {
      let decodedToken = jwtDecode<JwtPayload>(encodedToken);
      setAdminData(decodedToken)
    }
  }

  useEffect(() => {
    localStorage.getItem("adminToken") !== null ? saveAdminData() : null
  }, [])



  
  const routes = createBrowserRouter([
    {
      path: "dashboard", element: <ProtectedRoute><MasterLayout {...{ adminData }} /></ProtectedRoute>, errorElement: <NotFound />, children: [
        { index: true, element: <Home /> },
        { path: "users", element: <UsersList /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "recipes", element: <RecipesList /> },
      ]
    },

    {
      path: "/", element: <AuthLayout />, errorElement: <NotFound />, children: [
        { index: true, element: <Login {...{ saveAdminData }} /> },
        { path: "login", element: <Login {...{ saveAdminData }} /> },
        { path: "forget-pass-request", element: <ResetPassRequest /> },
        { path: "reset-pass", element: <ResetPass /> },
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
