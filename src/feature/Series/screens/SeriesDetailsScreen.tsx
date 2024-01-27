import Page from "@/components/Page";
import { useLocation } from "@/navigation";
import { lazily } from "react-lazily";
import { SeasonCardList } from "../components";

const { Grid } = lazily(() => import("@mui/material"));
const { CineastContainer, SeriesDetailsCard } = lazily(() => import("../components"));

export default function SeriesDetailsScreen() {
  const { seriesId } = useLocation("/series/details");

  return (
    <Page isSuspense>
      <Grid container justifyContent={"space-between"} rowGap={2}>
        <Grid xs={12} container gap={2}>
          <Grid xs={12} md={5.9} item lg={4.9}>
            <SeriesDetailsCard seriesId={seriesId} />
          </Grid>
          <Grid xs={12} md={5.9} item lg={6.9}>
            <SeasonCardList seriesId={seriesId} />
          </Grid>
        </Grid>
        <Grid xs={12} md={6} item lg={4}>
          <CineastContainer seriesId={seriesId} />
        </Grid>
      </Grid>
    </Page>
  );
}
