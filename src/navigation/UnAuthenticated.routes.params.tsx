import { FourOFourRoutesParams } from "@/feature/FourOFourScreen/FourOFourScreen.routes";
import { SignInRouteParams } from "@/feature/SignIn/SignIn.routes";

type UnAuthenticatedRouteParams = SignInRouteParams & FourOFourRoutesParams

export default UnAuthenticatedRouteParams;
