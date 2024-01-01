import { useLocation as rnUseLocation } from "react-router-dom";
import { AuthenticatedRouteParams, UnAuthenticatedRouteParams } from ".";

type RoutesParams = UnAuthenticatedRouteParams & AuthenticatedRouteParams;

export default function useLocation<K extends keyof RoutesParams>(_key: K): RoutesParams[K] {
  const location = rnUseLocation().state;

  return location;
}
