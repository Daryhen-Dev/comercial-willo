"use server";
import { api } from "@/lib/fetch-setting";
import { FetchResponse, formatFetchResponseError } from "@/lib/fetch-response";
import { AxiosError } from "axios";
import { formatFetchResponse } from "@/lib/fetch-response";
import {
  UserActiveInterface,
  UserCreateInterface,
  UserUpdatedInterface,
} from "@/interfaces";

export const user_get_all = async (): Promise<FetchResponse> => {
  try {
    const response = await api.get("/api/UserCad/GetAllUser");
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};

export const user_create = async (
  user: UserCreateInterface
): Promise<FetchResponse> => {
  try {
    const response = await api.post("/api/UserCad/CreatedUser", user);
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};

export const user_update = async (
  user: UserUpdatedInterface
): Promise<FetchResponse> => {
  try {
    const response = await api.put("/api/UserCad/UpdatedUser", user);
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};

export const user_active = async (
  user: UserActiveInterface
): Promise<FetchResponse> => {
  try {
    const response = await api.put("/api/UserCad/UpdatedUserActive", user);
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};
