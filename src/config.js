export const API_ORIGIN_URL =
  process.env.NODE_ENV === "production"
    ? `${window.location.origin}/api`
    : "http://localhost:3001/api";

export const appRoot = `${window.location.origin}`;
