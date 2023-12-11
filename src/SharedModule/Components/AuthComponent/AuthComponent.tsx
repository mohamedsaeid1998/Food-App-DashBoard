import { AuthLogo } from "@/assets/images"
import React from "react"
import { useLocation } from "react-router-dom"

interface Props{
  children:React.ReactNode
}

const AuthComponent = ({ children }:Props) => {
const {pathname} =  useLocation()
  return <>
    <main className="Auth-container container-fluid">
      <div className="row bg-overlay vh-100 justify-content-center align-items-center ">
        <div className="col-md-6">
          <div className={`bg-white p-5 animate__animated ${pathname === "/" ?" animate__zoomIn": pathname === "/reset-pass"?"animate__slideInDown" :"animate__zoomInDown"} ` }>
            <div className="logo text-center">
              <img src={AuthLogo} className='w-50 object-fit-cover' alt="logo" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </main>
  </>
}

export default AuthComponent
// animate__slideInDown