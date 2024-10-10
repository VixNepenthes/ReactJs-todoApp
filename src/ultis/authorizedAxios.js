import axios from 'axios';
import { toast } from 'react-toastify';
import { logoutUserAPI, refreshTokenAPI } from '../APIs';
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
/**
 * Khởi tạo một cái promise cho việc gọi api refresh_token
 * Mục đích tạo ra promise này để nhận yêu cầu refreshToken
 * đầu tiên thì hold lại xử lý xong api refresh_token thì mới
 * retry lại tránh lặp lại nhiều lần
 * */

let refreshTokenPromise = null;

// response interceptor: Can thiệp vào giữa những response API
authorizedAxiosInstance.interceptors.response.use(
	function (response) {
		// status code from 200-299 in here
		return response;
	},
	function (error) {
		if (error.response?.status === 401) {
			logoutUserAPI().then(() => {
				toast.error(error.response?.message);
				store.dispatch(userLogout());
			});
			return Promise.reject(error);
		}
		const originalRequest = error.config;
		const remembermeStatus = store.getState().user.remembermeStatus;
		console.log(remembermeStatus);
		if (error.response?.status === 410 && originalRequest) {
			if (!remembermeStatus) {
				logoutUserAPI().then(() => {
					store.dispatch(userLogout());
				});
				return Promise.reject(error);
			}
			if (!refreshTokenPromise) {
				refreshTokenPromise = refreshTokenAPI()
					.then((response) => {})
					.catch((_error) => {
						logoutUserAPI().then(() => {
							store.dispatch(userLogout());
						});
						return Promise.reject(_error);
					})
					.finally(() => {
						refreshTokenPromise = null;
					});
			}
			return refreshTokenPromise.then(() => {
				return authorizedAxiosInstance(originalRequest);
			});
		}

		// status code out of 200-299 in here
		if (error.response?.status !== 410) {
			toast.error(error.response?.data?.message || error?.message);
		}
		return Promise.reject(error);
	}
);
export default authorizedAxiosInstance;
