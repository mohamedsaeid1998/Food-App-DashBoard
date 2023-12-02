import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import { JwtPayload } from 'jwt-decode'
import {  NavBar } from '..'


interface Props {
  adminData:JwtPayload | null
}



const MasterLayout = ({adminData}:Props ) => {
  
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('adminToken')
    navigate('/')
  }

  return <>
  <div className="container-fluid d-flex ps-0 ">

        <div className='sidebar-container '>
          <SideBar {...{logOut}}/>
        </div>


        <div className='container-fluid '>
          <NavBar {...{adminData,logOut}}/>
          <Outlet/>
        </div>

      </div>

  </>
}

export default MasterLayout