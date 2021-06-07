export const joinQueryParameters = (query: Record<string, any>) =>
  query
    ? Object.values(query).filter((v) => v).length > 0
      ? `?${Object.entries(query)
          .filter(([k, v]) => v)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")}`
      : ""
    : "";
