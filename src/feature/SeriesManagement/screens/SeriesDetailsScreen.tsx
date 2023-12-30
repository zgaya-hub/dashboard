import Page from "@/components/Page";
import { Card } from "@mui/material";
import useNavigation from "@/navigation/use-navigation";
import { useTranslation } from "react-i18next";
import { SeriesBasicDetailsComponent, SeriesTable } from "../components";

export default function SeriesDetailsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <Page>
      <SeriesBasicDetailsComponent />
    </Page>
  );
}
