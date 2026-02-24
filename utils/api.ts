// utils/api.ts

export const API_BASE =
  "https://medsystemapplication.onrender.com/";

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  // Auto logout if token expired
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/my-account/login";
  }

  return response;
};