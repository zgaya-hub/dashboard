import { Route, Routes } from "react-router-dom";
import { FourOFourScreen } from "./screens";

export type FourOFourRoutesParams = {
  "*": undefined;
};

const FourOFourRoutes = () => {
  return (
    <Routes>
      <Route path="*" Component={FourOFourScreen} />
    </Routes>
  );
};

export default FourOFourRoutes;
