/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';

export interface HttpResponseData extends AxiosResponse {
  data: any;
  extraData: {
    [key: string]: number | string;
  };
  httpStatus: number;
  status: number;
  headers: any;
  msg?: string;
  pagination?: any;
}
