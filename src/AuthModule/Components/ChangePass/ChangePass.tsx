import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IFormValues } from '@/Interfaces'
import { ConfirmPassInput, PasswordInput } from '@/SharedModule/Components'
import baseUrl from '@/utils/Custom/Custom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { AuthLogo } from '@/assets/images'

const ChangePass = ({handleClose}:any) => {

  const [Loading, setLoading] = useState(false)

  const { register, getValues, handleSubmit, formState: { errors } } = useForm<IFormValues>()


  const onSubmit = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.put(`/api/v1/Users/ChangePassword`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    })
      .then((res) => {
        toast.success(`${res.data.message}`, {
          autoClose: 2000,
          theme: "colored",
        })
        handleClose()
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          autoClose: 2000,
          theme: "colored",
        });
      }).finally(() => {
        setLoading(false)
      })

  }

  return <>
    <main className="Auth-container">
      <div className="row justify-content-center align-items-center ">
        <div className="col-md-12">
          <div className="bg-white p-5 object-fit-cover">

            <div className="logo text-center">
              <img src={AuthLogo} className='w-50' alt="logo" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className='fw-bold'>Change Your Password</h2>
              <p>Enter your details below</p>

              <PasswordInput {...{register,errors}}inputName={'oldPassword'} placeholder='Old Password'  />

              <PasswordInput {...{register,errors}} inputName={'newPassword'} placeholder='New Password'  />

              <ConfirmPassInput {...{register,errors,getValues}} inputName={'confirmNewPassword'} placeholder='Confirm New Password'  />
              <button type='submit' disabled={Loading} className='btn btn-success w-100 mt-4 fw-bold'>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Change Password"}</button>

            </form>
          </div>
        </div>
      </div>
    </main>

  </>

}

export default ChangePass