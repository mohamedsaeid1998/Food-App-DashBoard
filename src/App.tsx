import { RouterProvider, createHashRouter } from 'react-router-dom'
import { AuthLayout, MasterLayout, NotFound, ProtectedRoute } from '@/SharedModule/Components'
import Home from './HomeModule/Components/Home/Home'
import UsersList from './UsersModule/Components/UsersList/UsersList'
import CategoriesList from './CategoriesModule/Components/CategoriesList/CategoriesList'
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList'
import { useEffect, useState } from 'react'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { Login, ResetPass, ResetPassRequest } from '@/AuthModule/Components'

function App() {
  




  useEffect(() => {
    localStorage.getItem("adminToken") !== null ? saveAdminData() : null
  }, [])
  const [adminData, setAdminData] = useState<JwtPayload | null>(null)


  const saveAdminData = () => {
    let encodedToken = localStorage.getItem('adminToken')
    if (encodedToken) {
      let decodedToken = jwtDecode<JwtPayload>(encodedToken);
      setAdminData(decodedToken)
    }
  }


  const routes = createHashRouter([
    {
      path: "dashboard", element: <ProtectedRoute><MasterLayout {...{adminData}} /></ProtectedRoute>, errorElement: <NotFound  />, children: [
        { index: true, element: <Home {...{adminData}}/> },
        { path: "users", element: <UsersList /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "recipes", element: <RecipesList /> },
      ]
    },

    {
      path: "/", element: <AuthLayout />, errorElement: <NotFound />, children: [
        { index: true, element: <Login {...{ saveAdminData,adminData }} /> },
        { path: "login", element: <Login {...{ saveAdminData,adminData }} /> },
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
