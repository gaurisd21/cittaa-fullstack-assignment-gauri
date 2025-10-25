import API from "./api";

// Login function
export const loginUser = async (email: string, password: string) => {
  const res = await API.post("/auth/login/", { username: email, password });
  localStorage.setItem("access_token", res.data.access);
  localStorage.setItem("refresh_token", res.data.refresh);
  return res.data;
};

// Logout function
export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
