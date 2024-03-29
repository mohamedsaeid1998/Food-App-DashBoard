import { IFormValues } from '@/Interfaces'
import { AuthComponent, EmailInput, PasswordInput } from '@/SharedModule/Components'
import baseUrl from '@/utils/Custom/Custom'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
interface Props {
  saveAdminData: () => void
}

const Login = ({ saveAdminData }: Props) => {

  const [Loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormValues>()

  function handleCallbackResponse(response: any) {
    localStorage.setItem("adminToken", response.credential)
    saveAdminData()
    navigate('/dashboard')
    toast.success('Welcome', {
      autoClose: 2000,
      theme: "colored",
    });

  }

  useEffect(() => {
    // @ts-ignore
    const google = window.google
    google.accounts.id.initialize({
      client_id: '320174446901-75vhr20bt9ei5l896ul3lldh92bshbdg.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" },
    )
    google.accounts.id.prompt()

  }, [])


  const onSubmit = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.post(`/api/v1/Users/Login`, data)
      .then((res) => {
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
      }).finally(() => {
        setLoading(false)
      })

  }

  return <>
    <Helmet>
      <title> Sign in • Food App </title>
    </Helmet>
    <AuthComponent setValue={setValue}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='fw-bold'>Log In</h2>
        <p>Welcome Back! Please enter your details</p>

        <EmailInput {...{ register, errors }} inputName={'email'} />

        <PasswordInput register={register} inputName={'password'} placeholder='Password' errors={errors} />


        <div className=' mt-2 d-flex flex-md-row justify-content-between align-items-center flex-column'>

          <Link to={'/forget-pass-request'} className='forget'>Forgot Password ?</Link>
        </div>
        <button type='submit' disabled={Loading} className='btn btn-success w-100 mt-4 fw-bold'>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Login"}</button>

      </form>

    </AuthComponent>

  </>
}

export default Login