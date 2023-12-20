import { IInputsProps } from "@/Interfaces"
import { useState } from "react";


const PasswordInput = ({ register, inputName, placeholder, errors }: IInputsProps) => {

  const [type, setType] = useState(false)
  const required = "This Field is required"
  return <>

    <div className='input-con'>
      <div className=' d-flex align-items-center justify-content-between '>
        <div className='d-flex gap-2 flex-grow-1'>
          <i className="fa-solid fa-lock pe-2"></i>
          <input
            className='form-control pass w-100'
            type={type ? "text" : "password"}
            placeholder={placeholder}
            {...register(`${inputName}`, {
              required,
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message: "pass must be at least 6 letters, including UPPER/lowercase, numbers and special characters"
              },
            })} />
        </div>
        <i onClick={() => setType(!type)} className={`fa-regular ${type ? 'fa-eye-slash' : 'fa-eye'} show `} ></i>
      </div>
    </div>
    {
      inputName === "oldPassword" ? errors?.oldPassword ? <span className='text-danger small'>{errors?.oldPassword?.message}</span> : null
        : inputName === "newPassword" ? errors?.newPassword ? <span className='text-danger small'>{errors?.newPassword?.message}</span> : null
          : errors?.password ? <span className='text-danger small'>{errors?.password?.message}</span> : null
    }

  </>
}

export default PasswordInput
