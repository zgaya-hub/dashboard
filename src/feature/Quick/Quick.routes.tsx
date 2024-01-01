import { Route, Routes } from "react-router-dom";
import { SeasonCreateScreen, SeriesCreateScreen } from "./screens";

export type QuickRoutesParams = {
  "/quick/series-create": undefined;
  "/quick/season-create/:seriesId": undefined;
};

const QuickRoutes = () => {
  return (
    <Routes>
      <Route path="/series-create" Component={SeriesCreateScreen} />
      <Route path="/season-create/:seriesId" Component={SeasonCreateScreen} />
    </Routes>
  );
};

export default QuickRoutes;
