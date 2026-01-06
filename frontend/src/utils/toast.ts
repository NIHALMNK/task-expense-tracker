import { toast } from "react-toastify";

export const showError = (message: string) => {
  toast.error(message || "Something went wrong");
};

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showInfo = (message: string) => {
  toast.info(message);
};
