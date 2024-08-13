export interface userLoginProps {
  email: string;
  password: string;
  loading: boolean;
}

export interface ErrorProps {
  emailError: string | undefined;
  passwordError: string | undefined;
}
