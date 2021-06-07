import { useRequestAgent } from "./useRequestAgent";
import { QueryParameters } from "models/rest-api";
import { joinQueryParameters } from "utils/executor";

export const useExecutor = () => {
  const requestAgent = useRequestAgent();

  return {
    get: async (ENDPOINT_ROUTE: string, params?: QueryParameters) => {
      const responseData = await requestAgent.get(
        `${ENDPOINT_ROUTE}${joinQueryParameters(params)}`
      );
      return responseData;
    },
    post: async <P = {}>(ENDPOINT_ROUTE: string, data: P) => {
      const responseData = await requestAgent.post(`${ENDPOINT_ROUTE}`, data);
      return responseData;
    },
    delete: async (ENDPOINT_ROUTE: string, id: string) => {
      const responseData = await requestAgent.delete(`${ENDPOINT_ROUTE}/${id}`);
      return responseData;
    },
    patch: async <P = {}>(ENDPOINT_ROUTE: string, data: P, id: string) => {
      const responseData = await requestAgent.patch(
        `${ENDPOINT_ROUTE}/${id}`,
        data
      );
      return responseData;
    },
  };
};
