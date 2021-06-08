import { useRequestAgent } from "./useRequestAgent";
import { ExecutorResponse, QueryParameters } from "models/rest-api";
import {
  handleError,
  handleSuccess,
  joinQueryParameters,
} from "utils/executor";

export const useExecutor = (ENDPOINT_ROUTE: string) => {
  const requestAgent = useRequestAgent();

  return {
    get: async (params?: QueryParameters, id?: string) => {
      return await execute(
        requestAgent.get,
        `${ENDPOINT_ROUTE}${joinQueryParameters(params)}${id ? `/${id}` : ""}`
      );
    },
    post: async <P = {}>(data: P) => {
      return await execute(requestAgent.post, `${ENDPOINT_ROUTE}`, data);
    },
    delete: async (id: string) => {
      return await execute(requestAgent.delete, `${ENDPOINT_ROUTE}/${id}`);
    },
    patch: async <P = {}>(data: P, id: string) => {
      return await execute(requestAgent.patch, `${ENDPOINT_ROUTE}/${id}`, data);
    },
  };
};

const execute = async (request, ...params): Promise<ExecutorResponse> => {
  try {
    const response = await request(...params);
    return handleSuccess(response);
  } catch (error) {
    if (error.response) {
      return handleError({ ...error.response, message: error.message });
    } else {
      return handleError({ status: 404, message: error.message || error });
    }
  }
};
