import { Route, Routes } from "react-router-dom";
import HomeRoutes from "@/feature/Home/Home.routes";
import VideoUploadRoutes from "@/feature/VideoUpload/VideoUpload.routes";
import FourOFourRoutes from "@/feature/FourOFourScreen/FourOFourScreen.routes";
import SeriesManagementRoutes from "@/feature/SeriesManagement/SeriesManagement.routes";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={[<LayoutSideBar />, <LayoutAppBar />, <LayoutAppHeader />]}>
        <Route path="home/*" Component={HomeRoutes} />
        <Route path="video-upload/*" Component={VideoUploadRoutes} />
        <Route path="series-management/*" Component={SeriesManagementRoutes} />
      </Route>
      <Route path="*" Component={FourOFourRoutes} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
