import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import { JwtPayload } from 'jwt-decode'


interface Props {
  adminData:JwtPayload | null
}


const MasterLayout = ({adminData}:Props ) => {

  console.log(adminData);
  
  return <>
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <div>
          <SideBar/>
        </div>
      </div>
      <div className="col-md-10">
        <div>
          <Outlet/>
        </div>
      </div>
    </div>
  </div>
  </>
}

export default MasterLayout