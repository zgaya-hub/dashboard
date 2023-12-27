import Page from "@/components/Page";
import DataGridPro from "@/components/DataGridPro/DataGridPro";
import SeriesGridContextMenu from "../components/SeriesGridContextMenu";
import Button from "@/components/Button";
import { Card, Stack, SxProps } from "@mui/material";
import { useDemoData } from "@mui/x-data-grid-generator";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

export default function SeriesManagementScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { data, loading } = useDemoData({
    dataSet: "Employee",
    rowLength: 1000,
    treeData: { maxDepth: 2, groupingField: "name", averageChildren: 200 },
  });

  const handleOnCreateSeriesClick = () => {
    navigation.navigate("/series-management/series-create");
  };

  const handleOnEdit = () => {
    console.log("Edit clicked for row:");
  };

  const handleOnDelete = () => {
    console.log("Delete clicked for row:");
  };

  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    padding: theme.spacing(4),
  }));

  const tableHeader = (
    <Stack gap={2} direction={"row"} mb={2} justifyContent={"end"}>
      <Button onClick={handleOnCreateSeriesClick}>{t("Feature.SeriesManagement.SeriesManagementScreen.createSeries")}</Button>
    </Stack>
  );

  return (
    <Page elevation={10}>
      <Card sx={cardStyle}>
        {tableHeader}
        <DataGridPro {...data} loading={loading} pagination contextMenuComponent={(isOpen, onClose, anchorEl) => <SeriesGridContextMenu onEdit={handleOnEdit} onDelete={handleOnDelete} onClose={onClose} anchorEl={anchorEl} isOpen={isOpen} />} />
      </Card>
    </Page>
  );
}
