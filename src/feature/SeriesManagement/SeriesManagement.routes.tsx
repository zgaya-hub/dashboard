import { Route, Routes } from "react-router-dom";
import { CreateSeriesScreen, SeriesManagementScreen } from "./screens";

export type SeriesManagementRouteParams = {
  "/series-management": undefined;
  "/series-management/create-series": undefined;
};

const SeriesManagementRoutes = () => {
  return (
    <Routes>
      <Route path="" Component={SeriesManagementScreen} />
      <Route path="/create-series" Component={CreateSeriesScreen} />
    </Routes>
  );
};

export default SeriesManagementRoutes;
