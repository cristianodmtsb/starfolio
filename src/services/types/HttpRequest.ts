/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from 'axios';
import { HttpMethod } from './HttpMethod';

export interface HttpRequest extends AxiosRequestConfig {
  url: string;
  method: HttpMethod;
  data?: any;
}
