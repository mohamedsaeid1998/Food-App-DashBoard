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
}

const SideBar = ({logOut}:Props) => {

  const [iscollapsed, setIscollapsed] = useState(false)
  const { pathname } = useLocation()
  const handleToggle = () => {
    setIscollapsed(!iscollapsed)
  }

  const links = [
    { path: "/dashboard", icon: <LiaHomeSolid size={'25px'} />, title: 'Home' },
    { path: '/dashboard/users', icon: <HiOutlineUsers size={'25px'} />, title: 'Users' },
    { path: '/dashboard/recipes', icon: <BsColumnsGap size={'25px'} />, title: 'Recipes' },
    { path: '/dashboard/categories', icon: <FaRegCalendarAlt size={'25px'} />, title: 'Categories' },
  ]
  const [modalState, setModalState] = useState("close")

  const showChangePassModal = () => {
    setModalState("ChangePass")
  }

  

  return <>
    <div className='sidebar-container text-white'>
<ModalUi  {...{setModalState,modalState}}/>
      <Sidebar  collapsed={iscollapsed}  className='vh-100 '>
        <Menu>
          <MenuItem className='my-4' onClick={() => handleToggle()}  ><img src={sideBarLogo} className='w-50' alt="logo" /></MenuItem>
          {links?.map((link) => <MenuItem  key={link.path} className={`${pathname === link.path ? 'active' : null} link`} icon={link.icon} component={<Link to={link.path} />}> {link.title}</MenuItem>)}
          <MenuItem onClick={showChangePassModal} icon={<IoIosUnlock size={'25px'} />}> Change Password</MenuItem>
          <MenuItem icon={<FiLogOut size={'25px'} />} onClick={() => logOut()}>LogOut</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  </>
}

export default SideBar
