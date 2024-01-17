import { AuthLogo } from "@/assets/images"
import React from "react"
import { useLocation } from "react-router-dom"

interface Props{
  children:React.ReactNode
}

const AuthComponent = ({ children }:Props) => {
const {pathname} =  useLocation()
  return <>
    <main className="Auth-container Auth-BackGround container-fluid">
      <div className="row bg-overlay justify-content-center align-items-center ">
        <div className="col-md-8 col-lg-6 col-10 py-3">
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
