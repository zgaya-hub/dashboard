import { FourOFourRoutesParams } from "@/feature/FourOFourScreen/FourOFourScreen.routes";
import { QuickMediaManagementRoutesParams } from "@/feature/QuickMediaManagement/QuickMediaManagement.routes";
import { SeriesManagementRoutesParams } from "@/feature/SeriesManagement/SeriesManagement.routes";
import { VideoUploadRoutesParams } from "@/feature/VideoUpload/VideoUpload.routes";
import { HomeRoutesParams } from "feature/Home/Home.routes";

type AuthenticatedRouteParams = HomeRoutesParams & VideoUploadRoutesParams & FourOFourRoutesParams & SeriesManagementRoutesParams & QuickMediaManagementRoutesParams;

export default AuthenticatedRouteParams;
