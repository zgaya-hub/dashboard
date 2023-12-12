import { Route, Routes } from "react-router-dom";
import { FourOFourScreen } from "./screens";

export type FourOFourRouteParams = {
  "/*": undefined;
};

const FourOFourRoutes = () => {
  return (
    <Routes>
      <Route Component={FourOFourScreen} />
    </Routes>
  );
};

export default FourOFourRoutes;
