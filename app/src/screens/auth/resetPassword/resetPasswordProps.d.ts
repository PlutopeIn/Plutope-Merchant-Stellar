export interface userInputProps {
  password: string;
  confirmPassword: string;
  loading: boolean;
}
export interface errorProps {
  passwordError: string | undefined;
  confirmPasswordError: string | undefined;
}
