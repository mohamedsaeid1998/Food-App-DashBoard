import { useLocation } from "react-router-dom"
import UsersAvatar from '@/assets/images/users-avatar.svg'
import HomeAvatar from '@/assets/images/home-avatar.svg'

interface Props {
  title: string
  subTitle: string
  para: string
  subPara: string
}


const Header = ({ title, subTitle, para, subPara }: Props) => {
  const { pathname } = useLocation()
  
  return <>

    <header className=" header-container rounded-3 ">
      <div className="row py-2 mt-3 align-items-center px-4 g-0  ">

        <div className="col-sm-10">

          <div className="px-3 text-white">
            <h3 className='fw-light'><span className="fw-bold h2">{title}</span>  {subTitle}</h3>

            <p className="fw-light">{para}<br /> {subPara}</p>
          </div>

        </div>

        <div className="col-sm-2">
          <div className='text-center'>

            <img src={pathname === "/dashboard" ? HomeAvatar : UsersAvatar} className='img-fluid' alt="" />
          </div>
        </div>

      </div>
    </header>

  </>
}

export default Header