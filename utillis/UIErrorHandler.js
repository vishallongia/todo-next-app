import toast from "react-hot-toast";
//showToast is only using when no redirection is needed on successfull data fetching only data needed
export const UIErrorHandler = (response, redirection, showToast = true) => {
  if (response.status === 401 || response.status === 403) {
    toast.error(response.message);
    return { success: false, redirection: "/login" };
  }
  if (response.status === 400) {
    toast.error(response.message);
    return { success: false, redirection: null };
  }
  if (response.status === 200 && !showToast) {
    return { success: true, data: response };
  } else {
    toast.success(response.message);
    return { success: true, redirection: redirection || null };
  }
};
