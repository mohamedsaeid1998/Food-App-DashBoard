import { NavAvatar, UpskillingLogo } from '@/assets/images';
import { UseAuthenticatedQuery } from '@/utils';
import { useTypewriter } from "react-simple-typewriter";

interface Props {
  logOut: () => void
  adminData: any
}

const NavBar = ({ logOut, adminData }: Props) => {


  const { data } = UseAuthenticatedQuery({
    queryKey: [`getUserDetails`],
    url: `https://upskilling-egypt.com:3006/api/v1/Users/currentUser`,
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      }
    }
  })

  const [text] = useTypewriter({
    words: ['Upskilling-Academy', 'Learn To Earn'],
    loop: true,
    typeSpeed: 120,
    deleteSpeed: 80,
  })


  return <>
    <nav className="navbar navbar-expand-lg bg-light mt-3 ">
      <div className="container-fluid">
        <div data-aos="fade-right" data-aos-delay="400" className='d-flex align-items-center'>

          <img src={UpskillingLogo} alt="Logo" width="70" height="70" className="d-inline-block align-text-top me-2 " />


        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className='d-flex justify-content-center align-items-center mt-1 w-100'>
          <h3 className='typeWriting'>{text}</h3>

        </div>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">

          <ul className="navbar-nav  mb-2 mb-lg-0  ">

            <li data-aos="fade-left" data-aos-delay="400" className="nav-item dropdown">

              <a className="nav-link dropdown-toggle d-flex align-items-center" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img className='navImage me-3' src={adminData?.given_name ? NavAvatar : data?.imagePath !== null ? `https://upskilling-egypt.com:3006/` + data?.imagePath : NavAvatar} alt="NavAvatar" />
                <div className='d-flex flex-column'>
                  <span className='capitalize'>{data?.userName || adminData?.given_name}</span>
                  <span className='navEmail small'>{data?.email || adminData?.email}</span>
                </div>

              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item pointer" onClick={logOut}>LogOut</a></li>
              </ul>
            </li>

          </ul>

        </div>
      </div>
    </nav>


  </>
}

export default NavBar


