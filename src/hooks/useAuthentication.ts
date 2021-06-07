// This should be connected to context or other state where authentication credentials are stored.
export const useAuthentication = () => {
  return {
    token: null,
  };
};
