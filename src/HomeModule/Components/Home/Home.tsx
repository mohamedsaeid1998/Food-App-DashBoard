import { Header } from "@/SharedModule/Components"
import { UseAuthenticatedQuery } from "@/utils";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom"


const Home = ({ adminData }: any) => {


  const { data } = UseAuthenticatedQuery({
    queryKey: [`getUserDetails`],
    url: `https://upskilling-egypt.com:443/api/v1/Users/currentUser`,
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      }
    }
  })





  return <>
    <Helmet>
      <title> Home • Food App</title>
    </Helmet>
    <div className="animate__animated animate__zoomIn">

      <Header title="Welcome" subTitle={`${data?.userName || adminData?.given_name} !`} para="This is a welcoming screen for the entry of the application ," subPara=" you can now see the options" />
      <main className="my-4 p-4  rounded-3 sub-dark-bg ">
        <div className="row align-items-center">

          <div className="col md-6">
            <div>
              <h4 className="dark-color">Fill the <span className="subColor">Recipes </span>!</h4>
              <p className="dark-color">you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
            </div>
          </div>

          <div className="col md-6">
            <Link to={'/dashboard/recipes'} className="text-end d-block">
              <button className="btn btn-success px-5 py-2 btn-sm">Fill Recipes <i className="fa fa-arrow-right ms-2"></i></button>
            </Link>
          </div>

        </div>
      </main>
    </div>

  </>
}

export default Home