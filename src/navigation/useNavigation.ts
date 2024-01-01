import { useNavigate as rnUseNavigate } from "react-router-dom";
import AuthenticatedRouteParams from "./Authenticated.routes.params";
import UnAuthenticatedRouteParams from "./UnAuthenticated.routes.params";

export type Routes = keyof AuthenticatedRouteParams | keyof UnAuthenticatedRouteParams;

type ParamsForRoute<T extends Routes> = T extends keyof AuthenticatedRouteParams ? (AuthenticatedRouteParams[T] extends undefined ? undefined : AuthenticatedRouteParams[T]) : never;

export default function useNavigation() {
  const rnNavigate = rnUseNavigate();

  const navigate = <T extends Routes>(route: T, params?: ParamsForRoute<T>) => {
    rnNavigate(route, { state: params });
  };

  const goBack = () => {
    rnNavigate(-1);
  };

  const goToHome = () => {
    rnNavigate("/");
  };

  return {
    navigate,
    goBack,
    goToHome,
  };
}
