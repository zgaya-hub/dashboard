import { Route, Routes } from "react-router-dom";
import { VideoUploadScreen } from "./screens";

export type VideoUploadRouteParams = {
  "/video-upload": undefined;
};

const VideoUploadRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={VideoUploadScreen} />
    </Routes>
  );
};

export default VideoUploadRoutes;
