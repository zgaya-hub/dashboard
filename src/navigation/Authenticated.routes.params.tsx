import { FourOFourRouteParams } from "@/feature/FourOFourScreen/FourOFourScreen.routes";
import { VideoUploadRouteParams } from "@/feature/VideoUpload/VideoUpload.routes";
import { HomeRouteParams } from "feature/Home/Home.routes";

type AuthenticatedRouteParams = HomeRouteParams & VideoUploadRouteParams & FourOFourRouteParams

export default AuthenticatedRouteParams;
