import { useLocation as rnUseLocation } from "react-router-dom";
import AuthenticatedRouteParams from "./Authenticated.routes.params";
import UnAuthenticatedRouteParams from "./UnAuthenticated.routes.params";

type AuthRoutes = keyof AuthenticatedRouteParams;
type UnauthRoutes = keyof UnAuthenticatedRouteParams;

export type Routes = AuthRoutes | UnauthRoutes;

type ParamsForRoute<T extends Routes> = T extends AuthRoutes ? (AuthenticatedRouteParams[T] extends undefined ? undefined : AuthenticatedRouteParams[T]) : T extends UnauthRoutes ? (UnAuthenticatedRouteParams[T] extends undefined ? undefined : UnAuthenticatedRouteParams[T]) : never;

export default function useLocation<T extends Routes>() {
  const location = rnUseLocation();
  return location.state as ParamsForRoute<T>;
}
