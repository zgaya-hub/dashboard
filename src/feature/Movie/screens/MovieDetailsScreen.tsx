import Page from "@/components/Page";
import { useLocation } from "@/navigation";
import { Grid } from "@mui/material";
import { MovieDetailsCard } from "../components";

export default function MovieDetailsScreen() {
  const location = useLocation("/movie/details");

  return (
    <Page>
      <Grid container justifyContent={"space-between"} rowGap={2}>
        <Grid xs={12} md={5.9} item lg={4}>
          <MovieDetailsCard movieId={location.movieId} />
        </Grid>
      </Grid>
    </Page>
  );
}
