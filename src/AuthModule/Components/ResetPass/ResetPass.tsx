import { IFormValues } from '@/Interfaces'
import { AuthComponent, ConfirmPassInput, EmailInput, PasswordInput } from '@/SharedModule/Components'
import baseUrl from '@/utils/Custom/Custom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ResetPass = () => {

  const [Loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<IFormValues>()


  const onSubmit = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.post(`/api/v1/Users/Reset`, data)
      .then((res) => {
        console.log(res)
        toast.success('Password changed successfully', {
          autoClose: 2000,
          theme: "colored",
        });
        navigate('/')
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          autoClose: 2000,
          theme: "colored",
        })
        setLoading(false)
      })

  }


  return <>
    <AuthComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='fw-bold'>Reset Password</h2>
        <p>Please Enter Your Otp or Check Your Inbox</p>

        <EmailInput {...{ register, errors }} inputName={'email'} />

        <div className='input-con'>

          <div className=' d-flex gap-2 '>
            <i className="fa-solid fa-lock pe-2"></i>
            <input
              className=' form-control w-100'
              type="text"
              placeholder='OTP'

              {...register("seed", {
                required: "OTP is Required",
                pattern: {
                  value: /^[a-zA-Z0-9]{4}$/,
                  message: " OTP must be 4 characters"
                }
              })}
            />

          </div>

        </div>
        {errors?.seed ? <span className='text-danger small'>{errors?.seed?.message}</span> : null}

        <PasswordInput register={register} inputName={'password'} placeholder='New Password' errors={errors} />

        <ConfirmPassInput register={register} inputName={'confirmPassword'} placeholder='Confirm New Password' getValues={getValues} errors={errors} />

        <div className=' mt-2 '>
          <Link to={'/'} className='forget'>Login Now ?</Link>
        </div>
        <button type='submit' disabled={Loading} className='btn btn-success w-100 mt-4 fw-bold'>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Reset Password"}</button>

      </form>
    </AuthComponent>
  </>
}

export default ResetPass