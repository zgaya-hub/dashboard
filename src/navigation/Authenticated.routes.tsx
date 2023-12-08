import { Route, Routes } from "react-router-dom";
import HomeRoutes from "@/feature/Home/Home.routes";
import { AnimatePresence } from "framer-motion";
import VideoUploadRoutes from "@/feature/VideoUpload/VideoUpload.routes";

const AuthenticatedRoutes = () => {
  return (
    <AnimatePresence mode="popLayout" initial>
      <Routes>
        <Route path="home/*" Component={HomeRoutes} />
        <Route path="video-upload/*" Component={VideoUploadRoutes} />
      </Routes>
    </AnimatePresence>
  );
};

export default AuthenticatedRoutes;
