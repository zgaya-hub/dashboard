import { Route, Routes } from "react-router-dom";
import { SeriesCreateScreen, SeriesTableScreen, SeriesDetailsScreen } from "./screens";

export type SeriesRoutesParams = {
  "/series": undefined;
  "/series/create": undefined;
  "/series/details": { seriesId: string };
};

const SeriesRoutes = () => {
  return (
    <Routes>
      <Route path="" Component={SeriesTableScreen} />
      <Route path="/create" Component={SeriesCreateScreen} />
      <Route path="/details" Component={SeriesDetailsScreen} />
    </Routes>
  );
};

export default SeriesRoutes;
