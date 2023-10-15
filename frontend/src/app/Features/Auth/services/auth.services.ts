import axios from "axios";
import jwtDecode from "jwt-decode";
import { BaseUrl } from "../..";
import { NewUser, User, LoginUser, Jwt, DecodedJwt } from "../../../../types/auth";

const register = async (newUser: NewUser): Promise<User | null> => {
  const response = await axios.post(`${BaseUrl}/auth/register`, newUser);
  return response.data;
};

const login = async (loginUser: LoginUser): Promise<Jwt> => {
  const response = await axios.post(`${BaseUrl}/auth/login`, loginUser);
  if (response.data) {
    localStorage.setItem("jwt", JSON.stringify(response.data));
    const decodedJwt: DecodedJwt = jwtDecode(response.data.access_token);
    // Or call the users/me to fetch the user information
    localStorage.setItem("user", JSON.stringify(decodedJwt.user));
  }
  return response.data;
};

const logout = (): void => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const response = await axios.post(`${BaseUrl}/auth/verify-jwt`, { jwt });
  if (response.data) {
    const jwtExpirationMs = response.data.exp * 1000;
    return jwtExpirationMs > Date.now();
  }
  return false;
};

const authService = {
  register,
  login,
  logout,
  verifyJwt,
};

export default authService;
