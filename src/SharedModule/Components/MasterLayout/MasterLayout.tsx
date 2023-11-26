import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import { JwtPayload } from 'jwt-decode'
import {  NavBar } from '..'


interface Props {
  adminData:JwtPayload | null
}


const MasterLayout = ({adminData}:Props ) => {
  
  return <>
  <div className="container-fluid">
    <div className="row ">
      <div className="col-md-2 ps-0 ">
        <div className='sidebar-container'>
          <SideBar/>
        </div>
      </div>
      <div className="col-md-10">
        <div className='container-fluid'>
          <NavBar {...{adminData}}/>
          <Outlet/>
        </div>
      </div>
    </div>
  </div>
  </>
}

export default MasterLayout