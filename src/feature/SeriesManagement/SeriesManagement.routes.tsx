import { Route, Routes } from "react-router-dom";
import { SeriesManagementScreen } from "./screens";

export type SeriesManagementRouteParams = {
  "/series-management": undefined;
};

const SeriesManagementRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={SeriesManagementScreen} />
    </Routes>
  );
};

export default SeriesManagementRoutes;
