export type RequestAgentMethod = "GET" | "POST" | "DELETE" | "PATCH";

export interface QueryParameters {
  [name: string]: any;
}

export enum StatusCode {
  OK = 200,
  UPDATED,
  NO_CONTENT = 204,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  NOT_AUTHORIZED,
  FORBIDDEN = 403,
  NOT_FOUND,
  INTERNAL_ERROR = 500,
}

export interface ExecutorResponse {
  success: boolean;
  status: number;
  data: any;
  message?: string;
}
