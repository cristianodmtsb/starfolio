/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';

export interface ResponseEntry extends AxiosResponse {
  data: any;
  msg?: string;
}
