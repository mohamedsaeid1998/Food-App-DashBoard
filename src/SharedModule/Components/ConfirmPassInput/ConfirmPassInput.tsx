import { IFormValues } from "@/Interfaces"
import { useState } from "react";
import { FieldErrors, UseFormGetValues, UseFormRegister } from "react-hook-form"

interface IProps {
  register: UseFormRegister<IFormValues>
  inputName: 'password' | "email" | "seed" | 'confirmPassword' | "newPassword" | "oldPassword" | "confirmNewPassword"
  placeholder: string
  getValues: UseFormGetValues<IFormValues>
  errors: FieldErrors<IFormValues>
}

const ConfirmPassInput = ({ register, inputName, placeholder, getValues, errors }: IProps) => {

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
              validate: (value) => value === getValues(inputName === "confirmNewPassword" ? "newPassword" : 'password') || 'Passwords do not match',
            })} />
        </div>
        <i onClick={() => setType(!type)} className={`fa-regular ${type ? 'fa-eye-slash' : 'fa-eye'} show `} ></i>
      </div>
    </div>
    {inputName === "confirmPassword" ? errors?.confirmPassword ? <span className='text-danger small'>{errors?.confirmPassword?.message}</span> : null
      : inputName === "confirmNewPassword" ? errors?.confirmNewPassword ? <span className='text-danger small'>{errors?.confirmNewPassword?.message}</span> : null
        : null
    }

  </>
}

export default ConfirmPassInput