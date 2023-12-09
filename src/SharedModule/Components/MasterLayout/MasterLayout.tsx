import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import { JwtPayload } from 'jwt-decode'
import { NavBar } from '..'
import { useState } from 'react'


interface Props {
  adminData: JwtPayload | null
}




const MasterLayout = ({ adminData }: Props) => {


  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('adminToken')
    navigate('/')
  }

  const [isSidebarOpen, setSidebarOpen] = useState(true);


  return <>
    <div className="container-fluid d-flex ps-0 ">

      <div className={`sidebar-container `}>
        <SideBar {...{ logOut ,setSidebarOpen ,isSidebarOpen}} />
      </div>


      <div className={`container-fluid main ${isSidebarOpen ? 'main-sidebar-open' : 'main-sidebar-closed'}`}>
        <NavBar {...{ adminData, logOut }} />
        <Outlet />
      </div>

    </div>

  </>
}

export default MasterLayout