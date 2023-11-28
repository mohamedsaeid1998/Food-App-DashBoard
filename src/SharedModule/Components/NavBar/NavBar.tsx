import { JwtPayload } from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../../../assets/images/Ellipse 234.svg"
import { IoNotifications } from "react-icons/io5";

interface Props {
  adminData?: JwtPayload | null
}


const NavBar = ({ adminData }: Props) => {
console.log(adminData);


  return <>
  
    <Navbar expand="lg" className="bg-body-tertiary mt-4">
      <Container fluid>

        <Navbar.Toggle aria-controls="navbarScroll" >
          <h5>UpSkilling</h5>

        </Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="my-2 my-lg-0 d-flex align-items-center gap-3 w-100"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Form className="d-flex flex-grow-1">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
            <img src={logo} alt="" />
            <NavDropdown title={"UpSkilling"} id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <div className="notification">
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