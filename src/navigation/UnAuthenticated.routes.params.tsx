import { FourOFourRoutesParams } from "@/feature/FourOFourScreen/FourOFourScreen.routes";
import { SignInRouteParams } from "@/feature/SignIn/SignIn.routes";
import { SignUpRouteParams } from "@/feature/SignUp/SignUp.routes";

type UnAuthenticatedRouteParams = SignInRouteParams & FourOFourRoutesParams & SignUpRouteParams

export default UnAuthenticatedRouteParams;
