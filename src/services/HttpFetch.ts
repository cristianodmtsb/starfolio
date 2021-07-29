/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { HttpRequest } from './types/HttpRequest';
import { HttpResponseData } from './types/HttpResponseData';
import { ResponseEntry } from './types/ResponseEntry';
import { envKeys } from 'src/config';
import { parseToPascalCase } from 'src/utils/object';

export const axiosInstance = axios.create({ baseURL: envKeys.apiUri() });

type RequestOptions = HttpRequest | ((...args) => HttpRequest);

const setRequestOptions = (requestOptions: RequestOptions, ...args) => {
  if (typeof requestOptions === 'function') {
    return requestOptions(...args);
  }

  if (typeof requestOptions === 'object') {
    return requestOptions;
  }

  throw new Error(
    'requestOptions must be a object or a function tha return on of type url, method, data'
  );
};

export const ResponseData = (response: ResponseEntry): HttpResponseData => {
  const data = response?.data?.data || response?.data;

  const status =
    response.data.status === null || response.data.status === undefined
      ? response.status
      : response.data.status;

  return parseToPascalCase({
    ...response,
    data,
    status,
    httpStatus: response.status,
    msg: response.msg,
    pagination: {
      currentPage: response?.data?.current_page,
      totalPages: response?.data?.total_pages,
      pageSize: response?.data?.page_size,
    },
  });
};

export const HttpFetch = async (requestOptions, ...args) => {
  try {
    const option = setRequestOptions(requestOptions, ...args);

    const response = await axiosInstance(option);

    return ResponseData(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error:', error.message);
    throw ResponseData(error.response);
  }
};

export default HttpFetch;
