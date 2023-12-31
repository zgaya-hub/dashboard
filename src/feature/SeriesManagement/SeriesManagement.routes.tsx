import { Route, Routes } from "react-router-dom";
import { SeriesCreateScreen, SeriesManagementScreen, SeriesDetailsScreen } from "./screens";

export type SeriesManagementRoutesParams = {
  "/series-management": undefined;
  "/series-management/series-create": undefined;
  "/series-management/series-details": { seriesId: string };
};

const SeriesManagementRoutes = () => {
  return (
    <Routes>
      <Route path="" Component={SeriesManagementScreen} />
      <Route path="/series-create" Component={SeriesCreateScreen} />
      <Route path="/series-details" Component={SeriesDetailsScreen} />
    </Routes>
  );
};

export default SeriesManagementRoutes;
