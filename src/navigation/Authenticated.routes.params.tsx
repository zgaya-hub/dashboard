import { FourOFourRouteParams } from "@/feature/FourOFourScreen/FourOFourScreen.routes";
import { SeriesManagementRouteParams } from "@/feature/SeriesManagement/SeriesManagement.routes";
import { VideoUploadRouteParams } from "@/feature/VideoUpload/VideoUpload.routes";
import { HomeRouteParams } from "feature/Home/Home.routes";

type AuthenticatedRouteParams = HomeRouteParams & VideoUploadRouteParams & FourOFourRouteParams & SeriesManagementRouteParams

export default AuthenticatedRouteParams;
