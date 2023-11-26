import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../assets/images/Login -logo.png'
import { useForm } from 'react-hook-form'
// import UseAuthenticatedQuery from '@/Hooks/UseAuthenticatedQuery'
import { toast } from 'react-toastify'
import { IFormValues } from '@/Interfaces'
import { useState } from 'react'
import baseUrl from '@/utils/Custom/Custom'

const ResetPassRequest = () => {

  const [Loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>()


  const onSubmit = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.post(`/api/v1/Users/Reset/Request`, data)
      .then((res) => {
        console.log(res)
          toast.success(' Mail Send Successfully', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        navigate('/reset-pass')
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false)
      })


    // const { isLoading  } = UseAuthenticatedQuery({
    //   queryKey:["LoginRequest"],
    //   url:`http://upskilling-egypt.com:3002/api/v1/Users/Login`,
    //   data,
    //     })

  }



  return <>

    <main className="Auth-container container-fluid">
      <div className="row bg-overlay vh-100 justify-content-center align-items-center ">
        <div className="col-md-6">
          <div className="bg-white p-5">

            <div className="logo text-center">
              <img src={logo} className='w-50' alt="logo" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className='fw-bold'>Request Reset Password</h2>
              <p>Please Enter Your Email And Check Your Inbox</p>

              <div className='input-con'>

                <div className=' d-flex gap-2 '>
                  <i className="fa-regular fa-envelope pe-2"></i>
                  <input
                    className=' form-control w-100'
                    type="email"
                    placeholder='Enter your E-mail'

                    {...register("email", {
                      required: true,
                      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                    })}
                  />

                </div>

              </div>
              {errors.email && errors.email.type === "required" ? <span className='text-danger'>Email is Required</span> : null}
              {errors.email && errors.email.type === "pattern" ? <span className='text-danger'>Email is InValid</span> : null}

              <div className=' mt-2 '>
                <Link to={'/'} className='forget'>Login Now ?</Link>
              </div>
              {Loading ? <button type='button' disabled className='btn btn-success w-100 mt-4 fw-bold'><i className='fa fa-spin fa-spinner'></i></button> : <button type='submit' className='btn btn-success w-100 mt-4 fw-bold'>Send</button>}
            </form>
          </div>
        </div>
      </div>
    </main>
  </>
}

export default ResetPassRequest