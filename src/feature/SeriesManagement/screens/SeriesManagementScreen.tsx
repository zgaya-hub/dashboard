import Page from "@/components/Page";
import DataGridPro from "@/components/DataGridPro/DataGridPro";
import SeriesGridContextMenu from "../components/SeriesGridContextMenu";
import Button from "@/components/Button";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";

export default function SeriesManagementScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleOnCreateSeriesClick = () => {
    navigation.navigate('/series-management/create-series')
  };

  const handleOnEdit = () => {
    console.log("Edit clicked for row:");
  };

  const handleOnDelete = () => {
    console.log("Delete clicked for row:");
  };

  const tableHeader = (
    <Stack gap={2} direction={"row"} mb={2} justifyContent={"end"}>
      <Button onClick={handleOnCreateSeriesClick}>{t("Feature.SeriesManagement.SeriesManagementScreen.createSeries")}</Button>
    </Stack>
  );

  return (
    <Page>
      <DataGridPro headerChildren={tableHeader} rows={[]} columns={[]} pagination contextMenuComponent={(isOpen, onClose, anchorEl) => <SeriesGridContextMenu onEdit={handleOnEdit} onDelete={handleOnDelete} onClose={onClose} anchorEl={anchorEl} isOpen={isOpen} />} />
    </Page>
  );
}
