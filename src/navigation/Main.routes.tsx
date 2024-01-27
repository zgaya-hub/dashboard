import AuthenticatedRoutes from "./Authenticated.routes";
import { useAuthContext } from "@/context/AuthContext";
import UnAuthenticatedRoutes from "./UnAuthenticated.routes";

export default function MainStack() {
  const { isAuthenticated } = useAuthContext();
  return !isAuthenticated ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />;
}
