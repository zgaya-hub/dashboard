import { Route, Routes } from "react-router-dom";
import SignInRoutes from "@/feature/SignIn/SignIn.routes";

const UnAuthenticatedRoutes = () => {
  return (
      <Routes>
        <Route path="sign-in/*" Component={SignInRoutes} />
      </Routes>
  );
};

export default UnAuthenticatedRoutes;
