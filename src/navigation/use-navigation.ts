import { useNavigate as rnUseNavigate } from "react-router-dom";
import AuthenticatedRouteParams from "./Authenticated.routes.params";

export type Routes = keyof AuthenticatedRouteParams;

type ParamsForRoute<T extends Routes> = T extends keyof AuthenticatedRouteParams
  ? AuthenticatedRouteParams[T] extends undefined
    ? undefined
    : AuthenticatedRouteParams[T]
  : never;

export default function useNavigation() {
  const rnNavigate = rnUseNavigate();

  const navigate = <T extends Routes>(route: T, params?: ParamsForRoute<T>) => {
    rnNavigate(`${route}/${params ? Object.values(params).join('/') : ""}`);
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
