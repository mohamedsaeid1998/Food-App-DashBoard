import { BsColumnsGap } from 'react-icons/bs';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { HiOutlineUsers } from 'react-icons/hi2';
import { IoIosUnlock } from 'react-icons/io';
import { LiaHomeSolid } from 'react-icons/lia';
import { MdOutlineMenu } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";

import "./CircularNav.scss";
import { ModalUi } from '..';
import { useState } from 'react';
const CircularNav = () => {

  const navigate = useNavigate()
  const [modalState, setModalState] = useState("close")

  const showChangePassModal = () => {
    setModalState("ChangePass")
  }

  const logOut = () => {
    localStorage.removeItem('adminToken')
    navigate('/')
  }

  return <>
  <ModalUi  {...{setModalState,modalState}}/>
    <div className='circularNav '>
      <div className="site">
        <div className="container">
      <nav className='navigation'>
        <input type="checkbox" id='link' hidden/>
        <label htmlFor="link" className='link'>
        <span className='menu'><MdOutlineMenu size={"35px"} /></span>
          <span className='close'><IoMdClose size={"35px"} /></span>
        </label>
        <ul className='submenu'>
          <li><Link to={'/dashboard'}><span>Home</span><LiaHomeSolid /></Link></li>
          <li><Link to={'/dashboard/users'}><span>Users</span><HiOutlineUsers /></Link></li>
          <li><Link to={'/dashboard/recipes'}><span>Recipes</span><BsColumnsGap /></Link></li>
          <li><Link to={'/dashboard/categories'}><span>Categories</span><FaRegCalendarAlt /></Link></li>
          <li onClick={showChangePassModal} ><span >ChangePass</span><IoIosUnlock /> </li>
          <li onClick={() => logOut()}><span >LogOut</span><FiLogOut /></li>
        </ul>
      </nav>
      </div>
      </div>

    </div>

  </>
}

export default CircularNav