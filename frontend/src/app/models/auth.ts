type User = {
  id: string;
  name: string;
  email: string;
};

type Jwt = { access_token: string } | null;

type DecodedJwt = {
  user: User;
  exp: number;
  iat: number;
};

type LoginUser = {
  email: string;
  password: string;
};

type RegisterUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type NewUser = Omit<RegisterUser, "confirmPassword">;

export type { User, Jwt, DecodedJwt, LoginUser, RegisterUser, NewUser };
