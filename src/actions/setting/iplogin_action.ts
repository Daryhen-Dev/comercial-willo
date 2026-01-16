import {
  IpLoginCreateInterface,
  IpLoginUpdateInterface,
} from "@/interfaces/settings/iplogin_action_interface";
import {
  FetchResponse,
  formatFetchResponse,
  formatFetchResponseError,
} from "@/lib/fetch-response";
import { api } from "@/lib/fetch-setting";
import { AxiosError } from "axios";

export const iplogin_get_all = async (): Promise<FetchResponse> => {
  try {
    const response = await api.get("/api/IpLogin/GetAllIpLogin");
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};

export const iplogin_create = async (
  ipLogin: IpLoginCreateInterface
): Promise<FetchResponse> => {
  try {
    const response = await api.post("/api/IpLogin/CreateIpLogin", ipLogin);
    return formatFetchResponse(response);
  } catch (error) {
    console.log("Error al crear ip para pc", error);
    return formatFetchResponseError(error as AxiosError);
  }
};

export const iplogin_update = async (
  ipLogin: IpLoginUpdateInterface
): Promise<FetchResponse> => {
  try {
    const response = await api.put("/api/IpLogin/UpdateIpLogin", ipLogin);
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};
