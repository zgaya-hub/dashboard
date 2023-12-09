import { Route, Routes } from "react-router-dom";
import HomeRoutes from "@/feature/Home/Home.routes";
import VideoUploadRoutes from "@/feature/VideoUpload/VideoUpload.routes";

const AuthenticatedRoutes = () => {
  return (
      <Routes>
        <Route path="home/*" Component={HomeRoutes} />
        <Route path="video-upload/*" Component={VideoUploadRoutes} />
      </Routes>
  );
};

export default AuthenticatedRoutes;
