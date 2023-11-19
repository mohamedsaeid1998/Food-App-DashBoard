import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/images/Login -logo.png'
import { useForm } from 'react-hook-form'
// import UseAuthenticatedQuery from '@/Hooks/UseAuthenticatedQuery'
import { toast } from 'react-toastify'
import { togglePass } from '@/App'
import { IFormValuesChange } from '@/Interfaces'
import { useState } from 'react'
import { baseUrl } from '@/utils/Custom/custom'
const ChangePass = () => {

  const [Loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<IFormValuesChange>()


  const onSubmit = (data: IFormValuesChange) => {
    setLoading(true)
    return baseUrl.put(`/api/v1/Users/ChangePassword`, data ,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    })
      .then((res) => {
        console.log(res)
        setTimeout(() => {
          toast.success(`${res.data.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }, 1);
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
    <main className="Auth-container">
      <div className="row justify-content-center align-items-center ">
        <div className="col-md-12">
          <div className="bg-white p-5">

            <div className="logo text-center">
              <img src={logo} className='w-50' alt="logo" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className='fw-bold'>Change Your Password</h2>
              <p>Enter your details below</p>


              <div className='input-con'>

                <div className=' d-flex align-items-center justify-content-between '>

                  <div className='d-flex gap-2'>
                    <i className="fa-solid fa-lock pe-2"></i>
                    <input
                      className='form-control pass'
                      type="password"
                      placeholder='Old Password'
                      {...register("oldPassword", {
                        required: true
                      })} />
                  </div>
                  <i onClick={() => togglePass()} className="fa-regular fa-eye show "></i>
                </div>

              </div>
              {errors.oldPassword && errors.oldPassword.type === "required" ? <span className='text-danger'>Old Password is Required</span> : null}

              <div className='input-con'>

                <div className=' d-flex align-items-center justify-content-between '>

                  <div className='d-flex gap-2'>
                    <i className="fa-solid fa-lock pe-2"></i>
                    <input
                      className='form-control pass'
                      type="password"
                      placeholder='New Password'
                      {...register("newPassword", {
                        required: true
                      })} />
                  </div>
                  <i onClick={() => togglePass()} className="fa-regular fa-eye show "></i>
                </div>

              </div>
              {errors.newPassword && errors.newPassword.type === "required" ? <span className='text-danger'>New Password is Required</span> : null}

              <div className='input-con'>

                <div className=' d-flex  align-items-center justify-content-between '>

                  <div className='d-flex gap-2'>
                    <i className="fa-solid fa-lock pe-2"></i>
                    <input
                      className='form-control pass'
                      type="password"
                      placeholder='Confirm New Password'
                      {...register("confirmNewPassword", {
                        required: true,
                        validate: (value) => value === getValues('newPassword') || 'Passwords do not match',
                      })} />
                  </div>
                  <i onClick={() => togglePass()} className="fa-regular fa-eye show "></i>
                </div>

              </div>
              {errors.confirmNewPassword && errors.confirmNewPassword.type === "required" ? <span className='text-danger'>confirmNewPassword is Required</span> : null}
              {errors.confirmNewPassword && errors.confirmNewPassword.type === "validate" ? <span className='text-danger'>Passwords do not match</span> : null}

              {Loading ? <button type='button' disabled className='btn btn-success w-100 mt-4 fw-bold'><i className='fa fa-spin fa-spinner'></i></button> : <button type='submit' className='btn btn-success w-100 mt-4 fw-bold'>Change Password</button>}
            </form>
          </div>
        </div>
      </div>
    </main>

  </>

}

export default ChangePass