import axios from 'axios';
import { toast } from 'react-toastify';
import { logoutUserAPI } from '../APIs';
import store from '../redux/store';
import { userLogout } from '../redux/actions/userActions';
let authorizedAxiosInstance = axios.create();

// Thời gian chờ tối đa của 1 request tối đa là 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;
/**
 * withCredentials: axios tự động đính kèm và gửi cookie trong mỗi request lên BE
 * phục vụ việc sử dụng JWT token (access và refresh) theo cơ chế http Only Cookie
 *  */
authorizedAxiosInstance.defaults.withCredentials = true;

/**
 * Cấu hình Interceptors
 */
// request interceptor: Can thiệp vào giữa những request API
authorizedAxiosInstance.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
// response interceptor: Can thiệp vào giữa những response API
authorizedAxiosInstance.interceptors.response.use(
	function (response) {
		// status code from 200-299 in here
		return response;
	},
	function (error) {
		if (error.response?.status === 401) {
			logoutUserAPI().then(() => {
				location.href = '/login';
				store.dispatch(userLogout());
			});
			toast.error(error.response?.data?.message || error?.message);
		}

		// status code out of 200-299 in here
		if (error.response?.status !== 410) {
			toast.error(error.response?.data?.message || error?.message);
		}
		return Promise.reject(error);
	}
);
export default authorizedAxiosInstance;
