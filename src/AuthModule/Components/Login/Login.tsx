import { Link, useNavigate } from 'react-router-dom'
import logo from '@/assets/images/Login -logo.png'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { IFormValues } from '@/Interfaces'
import { useState } from 'react'
import baseUrl from '@/utils/Custom/Custom'
import { PasswordInput } from '@/SharedModule/Components'


interface Props {
  saveAdminData: () => void
}

const Login = ({ saveAdminData }: Props) => {

  const [Loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { register, getValues,handleSubmit, formState: { errors } } = useForm<IFormValues>()



  const onSubmit = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.post(`/api/v1/Users/Login`, data)
      .then((res) => {
        console.log(res)
        localStorage.setItem("adminToken", res.data.token)
        saveAdminData()
          toast.success(' Welcome', {
            autoClose: 2000,
            theme: "colored",
          });
        navigate('/dashboard')
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          autoClose: 2000,
          theme: "colored",
        });
        setLoading(false)
      })


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
              <h2 className='fw-bold'>Log In</h2>
              <p>Welcome Back! Please enter your details</p>

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

                <div className=' d-flex  align-items-center justify-content-between '>

                <PasswordInput register={register} inputName={'password'} placeholder='Password'getValues={getValues} />


                </div>

              </div>
              {errors.password && errors.password.type === "required" ? <span className='text-danger'>Password is Required</span> : null}

              <div className=' mt-2 text-end'>
                <Link to={'/forget-pass-request'} className='forget'>Forgot Password ?</Link>
              </div>
              {Loading ? <button type='button' disabled className='btn btn-success w-100 mt-4 fw-bold'><i className='fa fa-spin fa-spinner'></i></button> : <button type='submit' className='btn btn-success w-100 mt-4 fw-bold'>Login</button>}
            </form>
          </div>
        </div>
      </div>
    </main>
  </>
}

export default Login