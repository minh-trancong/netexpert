export const authFetch = (
    url: string,
    options: RequestInit = {},
    timeout: number = 60000 // Default timeout of 60 seconds
  ): Promise<Response> => {
    const token = localStorage.getItem("token");
  
    // Combine headers with Authorization and Content-Type
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  
    // Create an AbortController for timeout handling
    const controller = new AbortController();
    const { signal } = controller;
  
    // Set up the timeout
    const timeoutId = setTimeout(() => controller.abort(), timeout);
  
    return fetch(url, {
      ...options,
      headers,
      signal,
    })
      .then((response) => {
        clearTimeout(timeoutId); // Clear the timeout if the request completes
        return response;
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          throw new Error("Request timed out");
        }
        throw error;
      });
  };