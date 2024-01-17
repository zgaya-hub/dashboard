import { Route, Routes } from "react-router-dom";
import { SeasonCreateScreen, SeriesCreateScreen, CineastCreateScreen, SeriesUpdateScreen } from "./screens";

export type QuickRoutesParams = {
  "/quick/series-create": undefined;
  "/quick/series-update/:seriesId": undefined;
  "/quick/cineast-create": undefined;
  "/quick/season-create/:seriesId": undefined;
};

const QuickRoutes = () => {
  return (
    <Routes>
      <Route path="/series-create" Component={SeriesCreateScreen} />
      <Route path="/series-update/:seriesId" Component={SeriesUpdateScreen} />
      <Route path="/season-create/:seriesId" Component={SeasonCreateScreen} />
      <Route path="/cineast-create" Component={CineastCreateScreen} />
    </Routes>
  );
};

export default QuickRoutes;
