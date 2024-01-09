import { FourOFourRoutesParams } from "@/feature/FourOFourScreen/FourOFourScreen.routes";
import { QuickRoutesParams } from "@/feature/Quick/Quick.routes";
import { SeriesRoutesParams } from "@/feature/Series/Series.routes";
import { VideoUploadRoutesParams } from "@/feature/Upload/VideoUpload.routes";
import { HomeRoutesParams } from "feature/Home/Home.routes";

type AuthenticatedRouteParams = HomeRoutesParams & VideoUploadRoutesParams & FourOFourRoutesParams & SeriesRoutesParams & QuickRoutesParams;

export default AuthenticatedRouteParams;
