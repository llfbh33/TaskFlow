let csrfToken;
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function restoreCSRF() {
  const res = await window.fetch(`${API_BASE_URL}/api/csrf/restore`, {
    credentials: "include",
  });

  const data = await res.json();
  csrfToken = data["XSRF-Token"];
  return csrfToken;
}

export async function csrfFetch(url, options = {}) {
  const fullUrl = `${API_BASE_URL}${url}`;

  options.method = options.method || "GET";
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    if (!csrfToken) await restoreCSRF();

    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";

    options.headers["X-CSRF-Token"] = csrfToken;
  }

  const res = await window.fetch(fullUrl, {
    ...options,
    credentials: "include",
  });

  if (res.status >= 400) throw res;
  return res;
}