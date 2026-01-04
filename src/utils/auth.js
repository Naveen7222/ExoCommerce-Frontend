import { jwtDecode } from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setUserId = (userId) => {
  localStorage.setItem("userId", userId);
};

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const getRole = () => {
  const user = getUserFromToken();
  return user?.role || null;
};

export const getUserId = () => {
  const user = getUserFromToken();
  return user?.id || null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};
