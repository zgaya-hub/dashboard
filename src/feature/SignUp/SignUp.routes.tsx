import { Route, Routes } from "react-router-dom";
import { SignUpInputScreen } from "./screens";

export type SignUpRouteParams = {
  "/signin": undefined;
};

const SignUpRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={SignUpInputScreen} />
    </Routes>
  );
};

export default SignUpRoutes;
