import { AxiosError, AxiosResponse } from "axios";

export interface FetchResponse {
  Success: boolean;
  Data: any;
  status: string;
  statusText: string;
}

export const formatFetchResponse = (response: AxiosResponse): FetchResponse => {
  return {
    Success: response.data.Success,
    Data: response.data,
    status: response.status.toString(),
    statusText: response.statusText,
  };
};
export const formatFetchResponseError = (error: AxiosError): FetchResponse => {
  return {
    Success: false,
    Data: error.response?.data,
    status: error.response?.status.toString() || "",
    statusText: error.response?.statusText || "",
  };
};
