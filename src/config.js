export const API_ORIGIN_URL =
  process.env.NODE_ENV === "production"
    ? window.location.origin
    : "http://localhost:3001/api";
