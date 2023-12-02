import { IInputsProps } from "@/Interfaces"

const EmailInput = ({ register, errors , inputName }: IInputsProps) => {


  return <>
    <div className='input-con'>

      <div className=' d-flex gap-2 '>
        <i className="fa-solid fa-mobile-screen pe-2"></i>
        <input
          className=' form-control w-100'
          type="email"
          placeholder='Enter your E-mail'

          {...register(`${inputName}`, {
            required: "Email is Required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is InValid",
            }
          })}
        />

      </div>

    </div>
    {errors?.email ? <span className='text-danger small'>{errors?.email?.message}</span> : null}
  </>

}

export default EmailInput