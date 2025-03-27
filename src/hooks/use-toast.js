import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const useToast = () => {
  const showToast = ({ title, description, variant = "default" }) => {
    const toastType = {
      success: toast.success,
      error: toast.error,
      warning: toast.warn,
      info: toast.info,
      default: toast,
    };

    toastType[variant](`${title}: ${description}`);
  };

  return { toast: showToast };
};
