import { Route, Routes } from "react-router-dom";
import { SeriesCreateScreen, SeriesManagementScreen } from "./screens";

export type SeriesManagementRoutesParams = {
  "/series-management": undefined;
  "/series-management/series-create": undefined;
};

const SeriesManagementRoutes = () => {
  return (
    <Routes>
      <Route path="" Component={SeriesManagementScreen} />
      <Route path="/series-create" Component={SeriesCreateScreen} />
    </Routes>
  );
};

export default SeriesManagementRoutes;
