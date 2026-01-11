import { AxiosError, AxiosResponse } from "axios";

export interface FetchResponse {
  Success: boolean;
  Message: string;
  Data: any;
  Status: string;
  StatusText: string;
}

export const formatFetchResponse = (response: AxiosResponse): FetchResponse => {
  return {
    Success: response.data.success,
    Message: response.data.message,
    Data: response.data.data,
    Status: response.status.toString(),
    StatusText: response.statusText,
  };
};
export const formatFetchResponseError = (
  error: AxiosError<any>
): FetchResponse => {
  return {
    Success: false,
    Message: error.response?.data?.message,
    Data: error.response?.data?.data,
    Status: error.response?.status.toString() || "",
    StatusText: error.response?.statusText || "",
  };
};
