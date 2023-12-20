import { useLocation } from 'react-router-dom'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { LiaHomeSolid } from "react-icons/lia";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsColumnsGap } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosUnlock } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useState } from 'react';
import { ModalUi } from '..';
import { sideBarLogo } from '@/assets/images';

interface Props {
  logOut:() => void
  setSidebarOpen:(a:boolean) => void
  isSidebarOpen:boolean
}

const SideBar = ({logOut,isSidebarOpen,setSidebarOpen}:Props) => {
  const [iscollapsed, setIscollapsed] = useState(false)


  const { pathname } = useLocation()
  const handleToggle = () => {
    setIscollapsed(!iscollapsed)
    setSidebarOpen(!isSidebarOpen)
  }

  const [modalState, setModalState] = useState("close")

  const showChangePassModal = () => {
    setModalState("ChangePass")
  }


  return <>
    <div className='sidebar-container text-white'>
<ModalUi  {...{setModalState,modalState}}/>
      <Sidebar  collapsed={iscollapsed}  className='h-100 '>
        <Menu>
          <MenuItem data-aos="zoom-out" className='my-4 logoImage'  onClick={() => handleToggle()} icon={<img src={sideBarLogo}  alt="logo" />} ></MenuItem>
          <MenuItem data-aos-delay="200" data-aos="fade-right"  className={`${pathname === "/dashboard" ? 'active' : null} link`} component={<Link to="/dashboard" />} icon={<LiaHomeSolid size={'25px'} />}>Home</MenuItem>
          <MenuItem data-aos-delay="300" data-aos="fade-right"  className={`${pathname === '/dashboard/users' ? 'active' : null} link`} component={<Link to='/dashboard/users' />} icon={<HiOutlineUsers size={'25px'} />}>Users</MenuItem>
          <MenuItem data-aos-delay="400" data-aos="fade-right"  className={`${pathname === '/dashboard/recipes' ? 'active' : null} link`} component={<Link to='/dashboard/recipes' />} icon={<BsColumnsGap size={'25px'} />}>Recipes</MenuItem>
          <MenuItem data-aos-delay="500" data-aos="fade-right"  className={`${pathname === '/dashboard/categories' ? 'active' : null} link`} component={<Link to='/dashboard/categories' />} icon={<FaRegCalendarAlt size={'25px'} />}>Categories</MenuItem>
          <MenuItem data-aos-delay="600" data-aos="fade-right" className='link' onClick={showChangePassModal} icon={<IoIosUnlock size={'25px'} />}> Change Password</MenuItem>
          <MenuItem data-aos-delay="700" data-aos="fade-right" className='link' icon={<FiLogOut size={'25px'} />} onClick={() => logOut()}>LogOut</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  </>
}

export default SideBar
