import { IFormValues } from '@/Interfaces'
import { AuthComponent, EmailInput } from '@/SharedModule/Components'
import baseUrl from '@/utils/Custom/Custom'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ResetPassRequest = () => {

  const [Loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>()


  const onSubmit = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.post(`/api/v1/Users/Reset/Request`, data)
      .then(() => {
        toast.success(' Mail Send Successfully', {
          autoClose: 2000,
          theme: "colored",
        });
        navigate('/reset-pass')
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
<Helmet>
  <title> Reset Password • Food App</title>
</Helmet>
    <AuthComponent>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='fw-bold'>Request Reset Password</h2>
        <p>Please Enter Your Email And Check Your Inbox</p>

        <EmailInput {...{ register, errors, }} inputName={'email'} />

        <div className=' mt-2 '>
          <Link to={'/'} className='forget'>Login Now ?</Link>
        </div>
        <button type='submit' disabled={Loading} className='btn btn-success w-100 mt-4 fw-bold'>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Send"}</button>

      </form>
    </AuthComponent>
  </>
}

export default ResetPassRequest