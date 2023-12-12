import { Route, Routes } from "react-router-dom";
import HomeRoutes from "@/feature/Home/Home.routes";
import VideoUploadRoutes from "@/feature/VideoUpload/VideoUpload.routes";
import FourOFourRoutes from "@/feature/FourOFourScreen/FourOFourScreen.routes";

const AuthenticatedRoutes = () => {
  return (
      <Routes>
        <Route path="home/*" Component={HomeRoutes} />
        <Route path="video-upload/*" Component={VideoUploadRoutes} />
        <Route path="/*" Component={FourOFourRoutes} />
      </Routes>
  );
};

export default AuthenticatedRoutes;
