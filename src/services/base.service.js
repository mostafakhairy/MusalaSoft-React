import axios from 'axios';
import Notification from '../components/shared/Notification/Notification';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const expectedError =
      error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
      //LOG EXCEPTION
      //TOASTER
      Notification({ message: 'Some thing went wrong', title: 'Error', type: 'danger' });
      return Promise.reject('Some thing went wrong');
    }
    if (error.response.status === 401) {
      //   if (window.location.pathname !== '/login') {
      //     localStorage.removeItem('token');
      //     window.location.href = '/login';
      //   }
      return Promise.reject('UnAuthorized');
    }
    if (error.response.status === 429) return Promise.reject('Try Again Later');

    return Promise.reject(error.response.data);
  }
);
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
