import {
  FetchResponse,
  formatFetchResponse,
  formatFetchResponseError,
} from "@/lib/fetch-response";
import { api } from "@/lib/fetch-setting";
import { AxiosError } from "axios";

export const product_formula_get = async (): Promise<FetchResponse> => {
  try {
    const response = await api.get("/api/Product/GetProductFormulaAll");
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};

export const product_MM_get = async (): Promise<FetchResponse> => {
  try {
    const response = await api.get("/api/Product/GetProductMMAll");
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};
