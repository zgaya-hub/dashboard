import { Route, Routes } from "react-router-dom";
import { MovieUploadScreen, TrailerUploadScreen, EpisodeUploadScreen } from "./screens";
import UploadScreen from "./screens/UploadScreen";

export type VideoUploadRoutesParams = {
  "/video-upload/episode": undefined;
  "/video-upload/movie": undefined;
  "/video-upload/trailer": undefined;
  "/video-upload": undefined;
};

const VideoUploadRoutes = () => {
  return (
    <Routes>
      <Route path="" Component={UploadScreen} />
      <Route path="movie" Component={MovieUploadScreen} />
      <Route path="trailer" Component={TrailerUploadScreen} />
      <Route path="episode" Component={EpisodeUploadScreen} />
    </Routes>
  );
};

export default VideoUploadRoutes;
