import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import { JwtPayload } from 'jwt-decode'
import { Header, NavBar } from '..'


interface Props {
  adminData:JwtPayload | null
}


const MasterLayout = ({adminData}:Props ) => {

  console.log(adminData);
  
  return <>
  <div className="container-fluid">
    <div className="row ">
      <div className="col-md-2 ps-0 ">
        <div>
          <SideBar/>
        </div>
      </div>
      <div className="col-md-10">
        <div>
          <NavBar/>
          <Header/>
          <Outlet/>
        </div>
      </div>
    </div>
  </div>
  </>
}

export default MasterLayout