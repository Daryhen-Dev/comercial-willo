import {
  FetchResponse,
  formatFetchResponse,
  formatFetchResponseError,
} from "@/lib/fetch-response";
import { api } from "@/lib/fetch-setting";
import { AxiosError } from "axios";

export const sucursal_get_all = async (): Promise<FetchResponse> => {
  try {
    const response = await api.get("/api/Sucursal/GetAllSucursal");
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};
