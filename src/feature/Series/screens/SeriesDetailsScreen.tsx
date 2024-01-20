import Page from "@/components/Page";
import { useLocation } from "@/navigation";
import { lazily } from "react-lazily";

const { Grid } = lazily(() => import("@mui/material"));
const { CineastContainer, SeriesDetailsCard } = lazily(() => import("../components"));

export default function SeriesDetailsScreen() {
  const location = useLocation("/series/details");

  return (
    <Page isSuspense>
      <Grid container justifyContent={"space-between"} rowGap={2}>
        <Grid xs={12} md={5.9} item lg={4}>
          <SeriesDetailsCard seriesId={location.seriesId} />
        </Grid>
        <Grid xs={12} md={6} item lg={6}></Grid>
        <Grid xs={12} md={6} item lg={4}>
          <CineastContainer seriesId={location.seriesId} />
        </Grid>
      </Grid>
    </Page>
  );
}
