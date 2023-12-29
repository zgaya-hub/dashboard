import Page from "@/components/Page";
import DataGridPro from "@/components/DataGridPro/DataGridPro";
import Button from "@/components/Button";
import { Card, Stack, Switch, SxProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { GridColDef } from "@mui/x-data-grid-pro";
import Tooltip from "@/components/Tooltip";
import { DeleteIcon, EditIcon, SaveIcon, SearchIcon } from "@/components/icons";
import { SeriesRowContextMenu } from "../components";
import { useGetManagerSeriesForTable } from "../hooks/queryHooks";
import { useEffect, useState } from "react";
import { PaginationStateInterface } from "@/types/types";
import { DEFAULT_PAGINATION_DATE } from "../constants";

export default function SeriesManagementScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [pagination, setPagination] = useState<PaginationStateInterface>(DEFAULT_PAGINATION_DATE);
  const { data: managerSeriesForTableData, mutateAsync: managerSeriesForTableMutateAsync, isPending: isManagerSeriesForTableLoading } = useGetManagerSeriesForTable();

  useEffect(() => {
    managerSeriesForTableMutateAsync(pagination);
  }, []);

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

  const tableActions = (
    <Stack gap={1} direction={"row"} alignItems={"center"}>
      <SearchIcon onClick={() => {}} />
      <DeleteIcon color="error" onClick={() => {}} />
      <EditIcon color="primary" onClick={() => {}} />
      <Tooltip title="Auto save">
        <Switch sx={{ margin: 0 }} />
      </Tooltip>
      <Button onClick={handleOnCreateSeriesClick}>{t("Feature.SeriesManagement.SeriesManagementScreen.createSeries")}</Button>
    </Stack>
  );

  const tableHeader = (
    <Stack direction={"row"} mb={2} justifyContent={"space-between"} alignItems={"center"}>
      <Typography variant="h5">Manage series</Typography>
      {tableActions}
    </Stack>
  );

  const tableFooter = (
    <Stack direction={"row"} justifyContent={"end"} mt={2} gap={1}>
      <Button variant="text">Cancle</Button>
      <Button endIcon={<SaveIcon />} variant="contained">
        Save
      </Button>
    </Stack>
  );

  return (
    <Page elevation={10}>
      <Card sx={cardStyle}>
        {tableHeader}
        <DataGridPro loading={isManagerSeriesForTableLoading} getRowId={(row) => row.ID} rows={managerSeriesForTableData?.seriesList ?? []} columns={SeriesTableColumn} pagination contextMenuComponent={(isOpen, onClose, anchorEl) => <SeriesRowContextMenu onEdit={handleOnEdit} onDelete={handleOnDelete} onClose={onClose} anchorEl={anchorEl} isOpen={isOpen} />} />
        {tableFooter}
      </Card>
    </Page>
  );
}

const SeriesTableColumn: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    width: 200,
  },
  {
    field: "mediaOriginCountry",
    headerName: "Origin country",
    width: 200,
  },
  {
    field: "mediaOriginalLanguage",
    headerName: "Original language",
    width: 200,
  },
  {
    field: "mediaGenre",
    headerName: "Genre",
    width: 200,
  },
  {
    field: "mediaStatus",
    headerName: "Status",
    width: 200,
  },
  {
    field: "mediaTitle",
    headerName: "Title",
    width: 200,
  },
  {
    field: "mediaPlotSummary",
    headerName: "Plot summary",
    width: 200,
  },
  {
    field: "mediaReleaseDate",
    headerName: "Release date",
    width: 200,
  },
  {
    field: "mediaImageUrl",
    headerName: "Image url",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 200,
  },
  {
    field: "updatedAt",
    headerName: "Updated at",
    width: 200,
  },
];
