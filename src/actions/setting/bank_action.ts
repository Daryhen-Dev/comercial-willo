import {
  BankActiveInterface,
  BankCreateInterface,
  BankNumerationChequeUpdateInterface,
  BankUpdateInterface,
} from "@/interfaces";
import {
  FetchResponse,
  formatFetchResponse,
  formatFetchResponseError,
} from "@/lib/fetch-response";
import { api } from "@/lib/fetch-setting";
import { AxiosError } from "axios";

export const bank_get_all = async (): Promise<FetchResponse> => {
  try {
    const response = await api.get("/api/Bank/GetAllBank");
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};

export const bank_create = async (
  bank: BankCreateInterface
): Promise<FetchResponse> => {
  try {
    const response = await api.post("/api/Bank/CreateBank", bank);
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};

export const bank_update = async (
  bank: BankUpdateInterface
): Promise<FetchResponse> => {
  try {
    const response = await api.put("/api/Bank/UpdateBank", bank);
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};

export const bank_active = async (
  bank: BankActiveInterface
): Promise<FetchResponse> => {
  try {
    const response = await api.put("/api/Bank/UpdateBankActive", bank);
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};

//-----------------------------------------------------------------------------------

export const bank_cheque_get_all = async (): Promise<FetchResponse> => {
  try {
    const response = await api.get("/api/Bank/GetAllBankNumericCheque");
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};

export const bank_cheque_update = async (
  bank: BankNumerationChequeUpdateInterface
): Promise<FetchResponse> => {
  try {
    const response = await api.put(
      "/api/Bank/UpdateBankNumerationCheque",
      bank
    );
    return formatFetchResponse(response);
  } catch (error) {
    return formatFetchResponseError(error as AxiosError);
  }
};
