export type CreateUser = {
  name: string;
  email: string;
  password: string;
};

export type ExistsUser = {
  email: string;
  password: string;
};
