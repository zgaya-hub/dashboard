export type ManagerSignInInput = {
  email: string;
  password: string;
};

export type ManagerSignInOutput = {
  managerSignIn: { token: string };
};
