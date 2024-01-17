import { AuthLogo } from "@/assets/images"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

const NotFound = () => {
  return <>
    <Helmet>
      <title> NotFound Page • Food App</title>
    </Helmet>
    <main className="NotFound-container container-fluid vh-100 pt-2 ps-5  animate__animated animate__zoomInDown">
      <img src={AuthLogo} className="w-25" alt="Logo" />
      <div className=" NotFound d-flex flex-column justify-content-center  ms-3 ">
        <h2 className="fw-bold fs-1">Oops....</h2>
        <span className="forget fw-medium fs-3 ">Page not found</span>
        <p className="my-3">This Page doesn’t exist or was removed!<br /> We suggest you back to home.</p>
        <Link to={localStorage.getItem("adminToken") !== null ? "/dashboard" : "/login"}>
          <button className="btn btn-success w-25 py-2 "><i className="fa fa-arrow-left me-2"></i>Back To Home</button>
        </Link>
      </div>
    </main>
  </>
}

export default NotFound