import { toast } from "react-toastify";

export const successToast = (message) => {
  return toast.success(message);
};

export const errorToast = (error) => {
  return toast.error(error?.response?.data?.message);
};
