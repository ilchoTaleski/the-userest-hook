import axios from "axios";
import { RequestAgentMethod } from "models/rest-api";
import { useAuthentication } from "./useAuthentication";

const API_ENDPOINT = "";

let requestsLog = [];

const usePerform = () => {
  const { token } = useAuthentication();
  return async <T>(
    method: RequestAgentMethod,
    url: string,
    data: T = null,
    headers = undefined,
    isPublic = false
  ) => {
    const performFunc = async () => {
      let _headers: any = headers
        ? {
            "Content-Type": headers["Content-Type"] || "application/json",
          }
        : {};

      if (!isPublic) _headers.Authorization = `Bearer ${token}`;

      return axios({
        method: method,
        url: url,
        data: data,
        headers: _headers,
      });
    };

    try {
      const res = await performFunc();
      requestsLog.push({
        date: new Date().toUTCString(),
        urlRequested: url,
        requestType: method,
        requestData: data,
        wasSuccessful: true,
      });
      return res;
    } catch (e) {
      requestsLog.push({
        date: new Date().toUTCString(),
        urlRequested: url,
        requestType: method,
        requestData: data,
        wasSuccessful: false,
        error: e,
      });
      throw e;
    }
  };
};

export const useRequestAgent = () => {
  const perform = usePerform();
  return {
    get: (path: string, isPublic: boolean = false, headers?: any) =>
      perform("GET", API_ENDPOINT + path, null, headers, isPublic),
    post: <T = {}>(path: string, data: T, isPublic = false, headers?: any) =>
      perform<T>("POST", API_ENDPOINT + path, data, headers, isPublic),
    delete: (path: string, isPublic: boolean = false, headers?: any) =>
      perform("DELETE", API_ENDPOINT + path, null, headers, isPublic),
    patch: <T = {}>(
      path: string,
      data: T,
      isPublic: boolean = false,
      headers?: any
    ) => perform<T>("PATCH", API_ENDPOINT + path, data, headers, isPublic),
    getLog: () => requestsLog,
    useUrl: (url) => {
      return {
        get: (isPublic: boolean = false, headers?: any) =>
          perform("GET", url, null, headers, isPublic),
        post: <T = {}>(data: T, isPublic = false, headers?: any) =>
          perform("POST", url, data, headers, isPublic),
        delete: (isPublic: boolean = false, headers?: any) =>
          perform("DELETE", url, null, headers, isPublic),
        patch: <T = {}>(data: T, isPublic: boolean = false, headers?: any) =>
          perform<T>("PATCH", url, data, headers, isPublic),
      };
    },
  };
};
