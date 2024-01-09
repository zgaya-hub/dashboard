import { Route, Routes } from "react-router-dom";
import { CineastCreateScreen } from "./screens";

export type CineastRoutesParams = {
  "/cineast/create": undefined;
};

const CineastRoutes = () => {
  return (
    <Routes>
      <Route path="/create" Component={CineastCreateScreen} />
    </Routes>
  );
};

export default CineastRoutes;
