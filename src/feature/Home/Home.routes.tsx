import { Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens";

export type HomeRouteParams = {
  "/home": undefined;
};

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={HomeScreen} />
    </Routes>
  );
};

export default HomeRoutes;
