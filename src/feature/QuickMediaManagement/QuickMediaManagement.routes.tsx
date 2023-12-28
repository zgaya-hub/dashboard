import { Route, Routes } from "react-router-dom";
import { SeriesCreateScreen } from "./screens";

export type QuickMediaManagementRoutesParams = {
  "/quick-media-management": undefined;
  "/quick-media-management/series-create": undefined;
};

const QuickMediaManagementRoutes = () => {
  return (
    <Routes>
      <Route path="/series-create" Component={SeriesCreateScreen} />
    </Routes>
  );
};

export default QuickMediaManagementRoutes;
