import axios, { AxiosInstance } from 'axios';

/**
 * Creates an instance of axios with predefined configuration.
 * This instance is configured with a base URL, which is used to
 * make HTTP requests to a specific domain. All requests using this
 * instance will automatically prepend the base URL to the endpoint paths.
 *
 * @returns {AxiosInstance} Configured axios instance with the base URL set.
 */
const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL || window.location.origin,
});

export default axiosInstance;
