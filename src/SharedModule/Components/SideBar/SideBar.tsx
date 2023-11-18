import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const navigate = useNavigate()

  const logOut = () => { 
    localStorage.removeItem('adminToken')
    navigate('/')
  }

  return <>
    <div>SideBar</div>
    <button onClick={() => logOut()} className='btn bg-danger'>logOut</button>
  </>
}

export default SideBar