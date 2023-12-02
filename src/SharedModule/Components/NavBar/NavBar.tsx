import { NavAvatar } from '@/assets/images';
import { JwtPayload } from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { IoNotifications } from "react-icons/io5";

interface Props {
  adminData?: JwtPayload | null
    logOut:() => void
}

//! Error Here
const NavBar = ({ adminData,logOut }: Props) => {
console.log(adminData);


  return <>
  
    <Navbar expand="lg" className="bg-body-tertiary mt-4 ">
      <Container fluid>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="my-2 d-flex align-items-center justify-content-end gap-3 w-100"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <img src={NavAvatar} alt="NavAvatar" />
            <NavDropdown title={"UpSkilling"} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={logOut}>LogOut</NavDropdown.Item>
            </NavDropdown>
            <div className="notification ">
              <IoNotifications size={20}/>
              <span></span>
            </div>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>

  </>
}

export default NavBar