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

export interface GetManyResponse<P> {
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: {
      active: boolean;
      label: string;
      url: string;
    }[];
  };
  links: {
    first: string;
    last: string;
    next: string;
    prev: string;
    url: string;
    label: string;
    active: boolean;
  };
  data: P[];
}

export interface PostResponse<P> {
  success: boolean;
  errors?: {
    [K in keyof P]: string;
  };
}
