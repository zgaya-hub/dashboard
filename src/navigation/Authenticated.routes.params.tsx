import { FourOFourRoutesParams } from "@/feature/FourOFourScreen/FourOFourScreen.routes";
import { QuickMediaManagementRoutesParams } from "@/feature/Quick/QuickMediaManagement.routes";
import { SeriesRoutesParams } from "@/feature/Series/Series.routes";
import { VideoUploadRoutesParams } from "@/feature/Upload/VideoUpload.routes";
import { HomeRoutesParams } from "feature/Home/Home.routes";

type AuthenticatedRouteParams = HomeRoutesParams & VideoUploadRoutesParams & FourOFourRoutesParams & SeriesRoutesParams & QuickMediaManagementRoutesParams;

export default AuthenticatedRouteParams;
