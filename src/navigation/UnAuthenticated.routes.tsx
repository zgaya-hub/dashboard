import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SignInRoutes from "@/feature/SignIn/SignIn.routes";

const UnAuthenticatedRoutes = () => {
  return (
    <AnimatePresence mode="popLayout" initial>
      <Routes>
        <Route path="sign-in/*" Component={SignInRoutes} />
      </Routes>
    </AnimatePresence>
  );
};

export default UnAuthenticatedRoutes;
