import { Route, Routes } from "react-router-dom";
import { MovieTableScreen, MovieDetailsScreen } from "./screens";

export type MovieRoutesParams = {
  "/movie": undefined;
  "/movie/details": { movieId: string };
};

const MovieRoutes = () => {
  return (
    <Routes>
      <Route path="" Component={MovieTableScreen} />
      <Route path="/details" Component={MovieDetailsScreen} />
    </Routes>
  );
};

export default MovieRoutes;
