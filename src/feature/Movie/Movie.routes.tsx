import { Route, Routes } from "react-router-dom";
import { MovieTableScreen, MovieDetailsScreen, MovieUpdateScreen } from "./screens";

export type MovieRoutesParams = {
  "/movie": undefined;
  "/movie/details": { movieId: string };
  "/movie/update": { movieId: string };
};

const MovieRoutes = () => {
  return (
    <Routes>
      <Route path="" Component={MovieTableScreen} />
      <Route path="/details" Component={MovieDetailsScreen} />
      <Route path="/update" Component={MovieUpdateScreen} />
    </Routes>
  );
};

export default MovieRoutes;
