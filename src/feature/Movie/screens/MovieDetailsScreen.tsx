import Page from "@/components/Page";
import { useLocation } from "@/navigation";
import { Grid } from "@mui/material";
// import { CineastContainer, MovieDetailsCard } from "../components";

export default function MovieDetailsScreen() {
  const location = useLocation("/series/details");

  return (
    <Page>
      <Grid container justifyContent={"space-between"} rowGap={4}>
        <Grid xs={12} md={5.9} item lg={4}>
          {/* <MovieDetailsCard seriesId={location.seriesId} />
        </Grid>
        <Grid xs={12} md={6} item lg={6}></Grid>
        <Grid xs={12} md={6} item lg={4}>
          <CineastContainer seriesId={location.seriesId}  /> */}
        </Grid>
      </Grid>
    </Page>
  );
}
