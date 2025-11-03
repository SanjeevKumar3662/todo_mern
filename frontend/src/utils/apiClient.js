const API_URI = import.meta.env.VITE_API_URI;

export async function apiClient(url, options = {}) {
  options.credentials = "include";
  options.headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  let response = await fetch(`${API_URI}${url}`, options);

  // If access token expired, try refreshing
  if (response.status === 401) {
    const refreshResponse = await fetch(`${API_URI}/users/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.ok) {
      // retry original request
      response = await fetch(`${API_URI}${url}`, options);
    } else {
      // refresh token invalid → force logout
      throw new Error("Session expired, please login again");
    }
  }

  return response;
}
