export interface userInputProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  loading: boolean;
}
export interface errorProps {
  oldPasswordError: string | undefined;
  newPasswordError: string | undefined;
  confirmPasswordError: string | undefined;
}
