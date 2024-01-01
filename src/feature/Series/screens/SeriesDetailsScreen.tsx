import Page from "@/components/Page";
import { useLocation } from "@/navigation";
import { Grid } from "@mui/material";
import { SeriesDetailsCard } from "../components";

export default function SeriesDetailsScreen() {
  const location = useLocation<"/series/series-details">();

  return (
    <Page>
      <Grid container justifyContent={"space-between"} rowGap={4}>
        <Grid xs={12} md={6} item lg={4}>
          <SeriesDetailsCard seriesId={location.seriesId} />
        </Grid>
      </Grid>
    </Page>
  );
}
