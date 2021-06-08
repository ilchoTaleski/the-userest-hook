export const joinQueryParameters = (query: Record<string, any>) =>
  query
    ? Object.values(query).filter((v) => v).length > 0
      ? `?${Object.entries(query)
          .filter(([k, v]) => v)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")}`
      : ""
    : "";

export const handleSuccess = (response) => {
  const data = response.data;
  return {
    success: true,
    status: response.status,
    data,
  };
};

export const handleError = (response) => {
  return {
    success: false,
    status: response.status,
    data: null,
    message: response.message,
  };
};
