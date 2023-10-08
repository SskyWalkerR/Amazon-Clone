import axios from "axios";
import { BaseUrl } from "../..";
import { NewUser, User } from "../../../types/auth";

const register = async (newUser: NewUser): Promise<User | null> => {
  const response = await axios.post(`${BaseUrl}/auth/register`, newUser);
  return response.data;
};

const authService = {
  register,
};

export default authService;
