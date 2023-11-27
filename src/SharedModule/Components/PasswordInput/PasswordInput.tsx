import { IFormValues } from "@/Interfaces"
import { useState } from "react";
import { UseFormGetValues, UseFormRegister } from "react-hook-form"

interface IProps {
  register: UseFormRegister<IFormValues>
  inputName: 'password' | "email" | "seed" | 'confirmPassword' | "newPassword" | "oldPassword" | "confirmNewPassword"
  placeholder: string
  getValues: UseFormGetValues<IFormValues>
}

const PasswordInput = ({ register, inputName, placeholder, getValues }: IProps) => {

  const [type, setType] = useState(false)
  console.log(type);

  return <>
    <div className='d-flex gap-2'>
      <i className="fa-solid fa-lock pe-2"></i>
      <input
        className='form-control pass w-100'
        type={type ? "text" : "password"}
        placeholder={placeholder}
        {...register(`${inputName}`, {
          required: true,
          
          validate: (value) => value === getValues(inputName ==="confirmNewPassword"?"newPassword":'password' ) || 'Passwords do not match'
          
        })} />
    </div>
    <i onClick={() => setType(!type)} className={`fa-regular ${type ? 'fa-eye-slash' : 'fa-eye'} show `} ></i>
  </>
}

export default PasswordInput


{/* <div className='d-flex gap-2'>
                    <i className="fa-solid fa-lock pe-2"></i>
                    <input
                      className='form-control pass w-100'
                      type="password"
                      placeholder='Confirm New Password'
                      {...register("confirmPassword", {
                        required: true,
                        validate: (value) => value === getValues('password') || 'Passwords do not match',
                      })} />
                  </div>
                  <i className="fa-regular fa-eye show "></i> */}