type ManagerSignInInput = {
  email: string;
  password: string;
};

type ManagerSignInOutput = {
  managerSignIn: { token: string };
};
