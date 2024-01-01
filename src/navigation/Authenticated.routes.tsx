import { Route, Routes } from "react-router-dom";
import HomeRoutes from "@/feature/Home/Home.routes";
import VideoUploadRoutes from "@/feature/Upload/VideoUpload.routes";
import FourOFourRoutes from "@/feature/FourOFourScreen/FourOFourScreen.routes";
import SeriesRoutes from "@/feature/Series/Series.routes";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import QuickMediaManagementRoutes from "@/feature/Quick/QuickMediaManagement.routes";
import { LayoutSidebar } from "@/Layout/LayoutSidebar";

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={[<LayoutSidebar />, <LayoutAppBar />, <LayoutAppHeader />]}>
        <Route path="home/*" Component={HomeRoutes} />
        <Route path="upload/*" Component={VideoUploadRoutes} />
        <Route path="series/*" Component={SeriesRoutes} />
      </Route>
      <Route path="quick/*" Component={QuickMediaManagementRoutes} />
      <Route path="*" Component={FourOFourRoutes} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
