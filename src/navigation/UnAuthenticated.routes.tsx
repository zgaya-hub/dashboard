import { Route, Routes } from "react-router-dom";
import SignInRoutes from "@/feature/SignIn/SignIn.routes";
import FourOFourRoutes from "@/feature/FourOFourScreen/FourOFourScreen.routes";
import SignUpRoutes from "@/feature/SignUp/SignUp.routes";

const UnAuthenticatedRoutes = () => {
  return (
      <Routes>
        <Route path="sign-in/*" Component={SignInRoutes} />
        <Route path="sign-up/*" Component={SignUpRoutes} />
        <Route path="*" Component={FourOFourRoutes} />
      </Routes>
  );
};

export default UnAuthenticatedRoutes;
