import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/images/Login -logo.png'
import { IFormValues } from '@/Interfaces'
import { PasswordInput } from '@/SharedModule/Components'
import baseUrl from '@/utils/Custom/Custom'
import { useState } from 'react'
import { toast } from 'react-toastify'
const ChangePass = () => {

  const [Loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { register, getValues,handleSubmit, formState: { errors } } = useForm<IFormValues>()


  const onSubmit = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.put(`/api/v1/Users/ChangePassword`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    })
      .then((res) => {
        console.log(res)
          toast.success(`${res.data.message}`, {
            autoClose: 2000,
            theme: "colored",
          })

        navigate('/')
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
                <PasswordInput register={register} inputName={'oldPassword'} placeholder='Old Password' getValues={getValues} />
                </div>

              </div>
              {errors.oldPassword && errors.oldPassword.type === "required" ? <span className='text-danger'>Old Password is Required</span> : null}

              <div className='input-con'>

                <div className=' d-flex align-items-center justify-content-between '>

                <PasswordInput register={register} inputName={'newPassword'} placeholder='New Password' getValues={getValues} />
                </div>

              </div>
              {errors.newPassword && errors.newPassword.type === "required" ? <span className='text-danger'>New Password is Required</span> : null}

              <div className='input-con'>

                <div className=' d-flex  align-items-center justify-content-between '>
                <PasswordInput register={register} inputName={'confirmNewPassword'} placeholder='Confirm New Password' getValues={getValues} />

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