import {
  IpCameraCreateInterface,
  IpCameraUpdateInterface,
} from "@/interfaces/settings/ipcamara_action_interface";
import {
  FetchResponse,
  formatFetchResponse,
  formatFetchResponseError,
} from "@/lib/fetch-response";
import { api } from "@/lib/fetch-setting";
import { AxiosError } from "axios";

export const ipcamera_get_all = async (): Promise<FetchResponse> => {
  try {
    const response = await api.get("/api/IpCamera/GetIpCameraList");
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};

export const ipcamera_create = async (
  ipcamera: IpCameraCreateInterface
): Promise<FetchResponse> => {
  try {
    const response = await api.post("/api/IpCamera/CreateIpCamera", ipcamera);
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};

export const ipcamera_update = async (
  ipcamera: IpCameraUpdateInterface
): Promise<FetchResponse> => {
  try {
    const response = await api.put("/api/IpCamera/UpdateIpCamera", ipcamera);
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};
