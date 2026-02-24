export const apiRequest = async (
  endpoint: string,
  token?: string,
  options: RequestInit = {}
) => {
  return fetch(`${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
};