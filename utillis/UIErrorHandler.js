import toast from "react-hot-toast";

export const UIErrorHandler = (response, redirection) => {
  if (response.status === 401 || response.status === 403) {
    toast.error(response.message);
    return { success: false, redirection: "/login" };
  }
  if (response.status === 400) {
    toast.error(response.message);
    return { success: false, redirection: null };
  } else {
    toast.success(response.message);
    return { success: true, redirection: redirection || null };
  }
};
