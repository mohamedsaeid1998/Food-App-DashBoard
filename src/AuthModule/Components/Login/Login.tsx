import { IFormValues } from '@/Interfaces'
import { AuthComponent, EmailInput, PasswordInput } from '@/SharedModule/Components'
import baseUrl from '@/utils/Custom/Custom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface Props {
  saveAdminData: () => void

}

const Login = ({ saveAdminData }: Props) => {

  const [Loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>()

  function handleCallbackResponse(response:any){
    console.log("Encoded JWD ID token"+ response.credential);
    localStorage.setItem("adminToken", response.credential)
    saveAdminData()
    navigate('/dashboard')

    toast.success(' Welcome', {
      autoClose: 2000,
      theme: "colored",
    });

    }
  // @ts-ignore
    google.accounts.id.prompt()
  useEffect(() => {
  // @ts-ignore
    google.accounts.id.initialize({
      client_id:'196510469832-fhki1v2qpvha1kor449ncf4b8ohrbj1v.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    })

      // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme:"outline", size:"large"},
  
    )

  }, [])

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
    <AuthComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='fw-bold'>Log In</h2>
        <p>Welcome Back! Please enter your details</p>

        <EmailInput {...{ register, errors, }} inputName={'email'} />

        <PasswordInput register={register} inputName={'password'} placeholder='Password' errors={errors} />


        <div className=' mt-2 text-end'>
                  <div id='signInDiv'></div>
          <Link to={'/forget-pass-request'} className='forget'>Forgot Password ?</Link>
        </div>
        <button type='submit' disabled={Loading} className='btn btn-success w-100 mt-4 fw-bold'>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Login"}</button>

      </form>
    </AuthComponent>
  </>
}

export default Login