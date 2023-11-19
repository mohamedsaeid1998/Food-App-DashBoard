export interface IFormValues {
  email: string,
  password?: string,
  confirmPassword?: string,
  seed?: string,
}

export interface IFormValuesChange {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string,
}