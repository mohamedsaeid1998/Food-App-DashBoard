import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../assets/images/Login -logo.png'
import { useForm } from 'react-hook-form'
// import UseAuthenticatedQuery from '@/Hooks/UseAuthenticatedQuery'
import { toast } from 'react-toastify'
import { IFormValues } from '@/Interfaces'
import { useState } from 'react'
import baseUrl from '@/utils/Custom/Custom'
import { PasswordInput } from '@/SharedModule/Components'

const ResetPass = () => {

  const [Loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { register, handleSubmit,  formState: { errors } } = useForm<IFormValues>()


  const onSubmit = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.post(`/api/v1/Users/Reset`, data)
      .then((res) => {
        console.log(res)
          toast.success('Password changed successfully', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        navigate('/')
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
              <h2 className='fw-bold'>Reset Password</h2>
              <p>Please Enter Your Otp or Check Your Inbox</p>

              <div className='input-con'>

                <div className=' d-flex gap-2 '>
                  <i className="fa-solid fa-mobile-screen pe-2"></i>
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

              <div className='input-con'>

                <div className=' d-flex gap-2 '>
                  <i className="fa-solid fa-lock pe-2"></i>
                  <input
                    className=' form-control w-100'
                    type="text"
                    placeholder='OTP'

                    {...register("seed", {
                      required: true,
                    })}
                  />

                </div>

              </div>
              {errors.email && errors.email.type === "required" ? <span className='text-danger'>Email is Required</span> : null}

              <div className='input-con'>

                <div className=' d-flex align-items-center justify-content-between '>

                <PasswordInput register={register} inputName={'password'} placeholder='New Password'  />

                </div>

              </div>
              {errors.password && errors.password.type === "required" ? <span className='text-danger'>Password is Required</span> : null}

              <div className='input-con'>

                <div className=' d-flex  align-items-center justify-content-between '>
                <PasswordInput register={register} inputName={'confirmPassword'} placeholder='Confirm New Password'  />

                </div>

              </div>
              {errors.confirmPassword && errors.confirmPassword.type === "required" ? <span className='text-danger'>Password is Required</span> : null}
              {errors.confirmPassword && errors.confirmPassword.type === "validate" ? <span className='text-danger'>Passwords do not match</span> : null}

              <div className=' mt-2 '>
                <Link to={'/'} className='forget'>Login Now ?</Link>
              </div>
              {Loading ? <button type='button' disabled className='btn btn-success w-100 mt-4 fw-bold'><i className='fa fa-spin fa-spinner'></i></button> : <button type='submit' className='btn btn-success w-100 mt-4 fw-bold'>Reset Password</button>}
            </form>
          </div>
        </div>
      </div>
    </main>
  </>
}

export default ResetPass