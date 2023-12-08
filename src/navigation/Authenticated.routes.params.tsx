import { VideoUploadRouteParams } from "@/feature/VideoUpload/VideoUpload.routes";
import { HomeRouteParams } from "feature/Home/Home.routes";


type AuthenticatedRouteParams = HomeRouteParams & VideoUploadRouteParams


export default AuthenticatedRouteParams