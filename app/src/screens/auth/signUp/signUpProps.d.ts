export interface userSignupProps {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
  selectCountryCode: string | undefined;
  mobileLength: number | undefined;
  loading: boolean;
}

export interface errorProps {
  firstNameError: string | undefined;
  lastNameError: string | undefined;
  emailError: string | undefined;
  mobileError: string | undefined;
  passwordError: string | undefined;
  confirmPasswordError: string | undefined;
}
