import { useLocation as rnUseLocation } from "react-router-dom";
import { AuthenticatedRouteParams, UnAuthenticatedRouteParams } from ".";

type RoutesParams = UnAuthenticatedRouteParams & AuthenticatedRouteParams;

export default function useLocation<K extends keyof RoutesParams>(_key?: K) {
  const location = rnUseLocation();
  const state = location.state as RoutesParams[K];

  return { ...location, ...state };
}
