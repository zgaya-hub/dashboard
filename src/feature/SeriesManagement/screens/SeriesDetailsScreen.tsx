import Page from "@/components/Page";
import { SeriesBasicDetailsComponent } from "../components";
import { useLocation } from "@/navigation";


export default function SeriesDetailsScreen() {
  const location = useLocation<'/series-management/series-details'>();

  return (
    <Page>
      <SeriesBasicDetailsComponent seriesId={location.seriesId!} />
    </Page>
  );
}
