import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import { CircularNav, NavBar } from '..'
import { useState } from 'react'



const MasterLayout = ({adminData}:any) => {


  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('adminToken')
    navigate('/')
  }

  const [isSidebarOpen, setSidebarOpen] = useState(true);


  return <>
    <div className="container-fluid d-flex ps-0  ">

      <div className={`sidebar-container `}>
        <SideBar {...{ logOut ,setSidebarOpen ,isSidebarOpen}} />
      </div>


      <div className={`container-fluid main ${isSidebarOpen ? 'main-sidebar-open' : 'main-sidebar-closed'}`}>
        <NavBar {...{ logOut,adminData }} />
        <CircularNav/>
        <Outlet />
      </div>

    </div>

  </>
}

export default MasterLayout