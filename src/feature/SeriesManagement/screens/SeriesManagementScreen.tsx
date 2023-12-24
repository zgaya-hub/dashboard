import Page from "@/components/Page";
import DataGridPro from "@/components/DataGridPro/DataGridPro";
import { useDemoData } from "@mui/x-data-grid-generator";
import SeriesGridContextMenu from "../components/SeriesGridContextMenu";
import Button from "@/components/Button";
import { IconButton, Stack } from "@mui/material";
import { AddIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import { GridDeleteIcon, GridVisibilityOffIcon } from "@mui/x-data-grid-pro";

export default function SeriesManagementScreen() {
  const { t } = useTranslation();
  const handleEdit = () => {
    // Implement your edit logic here
    console.log("Edit clicked for row:");
  };

  const handleDelete = () => {
    // Implement your delete logic here
    console.log("Delete clicked for row:");
  };

  const { data, loading } = useDemoData({
    dataSet: "Employee",
    rowLength: 10,
  });

  const tableHeader = (
    <Stack gap={2} direction={"row"} mb={2} justifyContent={"end"}>
      <IconButton>
        <GridDeleteIcon />
      </IconButton>
      <Button>{t("Feature.SeriesManagement.SeriesManagementScreen.createSeries")}</Button>
    </Stack>
  );

  return (
    <Page>
      <DataGridPro headerChildren={tableHeader} loading={loading} rows={data.rows} columns={data.columns} pagination contextMenuComponent={(isOpen, onClose, anchorEl) => <SeriesGridContextMenu onEdit={handleEdit} onDelete={handleDelete} onClose={onClose} anchorEl={anchorEl} isOpen={isOpen} />} />
    </Page>
  );
}
