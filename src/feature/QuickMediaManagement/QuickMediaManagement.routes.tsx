import { Route, Routes } from "react-router-dom";
import { SeasonCreateScreen, SeriesCreateScreen } from "./screens";

export type QuickMediaManagementRoutesParams = {
  "/quick-media-management": undefined;
  "/quick-media-management/series-create": undefined;
  "/quick-media-management/season-create/:seriesId": undefined;
};

const QuickMediaManagementRoutes = () => {
  return (
    <Routes>
      <Route path="/series-create" Component={SeriesCreateScreen} />
      <Route path="/season-create/:seriesId" Component={SeasonCreateScreen} />
    </Routes>
  );
};

export default QuickMediaManagementRoutes;
