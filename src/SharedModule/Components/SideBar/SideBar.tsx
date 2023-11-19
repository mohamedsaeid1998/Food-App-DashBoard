import { useLocation, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { LiaHomeSolid } from "react-icons/lia";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsColumnsGap } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosUnlock } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useState } from 'react';
import logo from '../../../assets/images/sidebar-logo.png'
import Modal from 'react-bootstrap/Modal';
import { ChangePass } from '@/AuthModule/Components';

const SideBar = () => {
  const navigate = useNavigate()
  const [iscollapsed, setIscollapsed] = useState(false)

  const { pathname } = useLocation()
  const handleToggle = () => {
    setIscollapsed(!iscollapsed)
  }


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


const logOut = () => {
    localStorage.removeItem('adminToken')
    navigate('/')
  }
  return <>
    <div className='sidebar-container text-white'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body><ChangePass /></Modal.Body>
      </Modal>
      <Sidebar collapsed={iscollapsed} className='vh-100'>
        <Menu>
          {/* <MenuItem onClick={() => handleToggle()}  ><img src={logo} className='img-fluid w-75' alt="logo" /></MenuItem> */}
          <img onClick={() => handleToggle()} src={logo} className='img-fluid w-75 ms-2' alt="logo" />
          <MenuItem className={`${pathname === '/dashboard' ? 'active' : null}`} icon={<LiaHomeSolid size={'25px'} />} component={<Link to="/dashboard" />}> Home</MenuItem>
          <MenuItem className={`${pathname === '/dashboard/users' ? 'active' : null}`} icon={<HiOutlineUsers size={'25px'} />} component={<Link to="/dashboard/users" />}> Users</MenuItem>
          <MenuItem className={`${pathname === '/dashboard/recipes' ? 'active' : null}`} icon={<BsColumnsGap size={'25px'} />} component={<Link to="/dashboard/recipes" />}> Recipes</MenuItem>
          <MenuItem className={`${pathname === '/dashboard/categories' ? 'active' : null}`} icon={<FaRegCalendarAlt size={'25px'} />} component={<Link to="/dashboard/categories" />}> Categories</MenuItem>
          <MenuItem onClick={handleShow} icon={<IoIosUnlock size={'25px'} />}> Change Password</MenuItem>
          <MenuItem icon={<FiLogOut size={'25px'} />} onClick={() => logOut()}>LogOut</MenuItem>
        </Menu>
      </Sidebar>
    </div>


  </>
}

export default SideBar