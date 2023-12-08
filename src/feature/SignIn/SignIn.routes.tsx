import { Route, Routes } from "react-router-dom";
import { SignInInputScreen } from "./screens";

export type SignInRouteParams = {
  "/signin": undefined;
};

const SignInRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={SignInInputScreen} />
    </Routes>
  );
};

export default SignInRoutes;
