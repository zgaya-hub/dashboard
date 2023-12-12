import { FourOFourRouteParams } from "@/feature/FourOFourScreen/FourOFourScreen.routes";
import { SignInRouteParams } from "@/feature/SignIn/SignIn.routes";

type UnAuthenticatedRouteParams = SignInRouteParams & FourOFourRouteParams

export default UnAuthenticatedRouteParams;
