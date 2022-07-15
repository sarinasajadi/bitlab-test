import Axios, { AxiosInstance, AxiosResponse } from 'axios';

/**
 *
 * @returns {AxiosInstance}
 * @method
 */
const CreateHeaderWithBearerAuthentication = (): AxiosInstance =>
  Axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });


export const Post = async <T = any>(url: string, object: T): Promise<AxiosResponse<T>> =>
  CreateHeaderWithBearerAuthentication().post(`${url}`, object);
