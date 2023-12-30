import { useEffect, useState } from "react";
import Page from "@/components/Page";
import { Card, Stack, Switch, SxProps, Typography } from "@mui/material";
import Button from "@/components/Button";
import useNavigation from "@/navigation/use-navigation";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { useTranslation } from "react-i18next";
import { DEFAULT_PAGINATION_DATE } from "../constants";
import { GridEventListener, GridPaginationModel, GridRowSelectionModel } from "@mui/x-data-grid-pro";
import { useDeleteMultipleSeriesByIdz, useDeleteSeriesById, useGetManagerSeriesForTable } from "../hooks/queryHooks";
import { CachedIcon, DeleteIcon, EditIcon, SaveIcon, SearchIcon } from "@/components/icons";
import Tooltip from "@/components/Tooltip";
import { SeriesTable } from "../components";
import FullFeaturedCrudGrid from "../components/FullFeaturedCrudGrid";

export default function SeriesManagementScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(DEFAULT_PAGINATION_DATE);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const { mutateAsync: deleteSeriesByIdMutateAsync } = useDeleteSeriesById();
  const { mutateAsync: deleteMultipleSeriesByIdzMutateAsync, isPending: isDeleteMultipleSeriesLoading } = useDeleteMultipleSeriesByIdz();
  const {
    data: managerSeriesForTableData,
    refetch: managerSeriesForTableRefetch,
    isFetching: isManagerSeriesForTableLoading,
  } = useGetManagerSeriesForTable({ Page: paginationModel.page, PageSize: paginationModel.pageSize });

  useEffect(() => {
    if (managerSeriesForTableData) {
      managerSeriesForTableRefetch();
    }
  }, [paginationModel]);

  const handleOnCreateSeriesClick = () => {
    navigation.navigate("/series-management/series-create");
  };

  const handleOnEdit = (selectedRowId: string) => {
    console.log("Edit clicked for row ID:", selectedRowId);
  };

  const handleOnPreview = (selectedRowId: string) => {
    console.log("Edit clicked for row ID:", selectedRowId);
  };

  const handleOnSeasonCreate = (selectedRowId: string) => {
    console.log("Edit clicked for row ID:", selectedRowId);
  };

  const handleOnSelect = (selectedRowId: string) => {
    console.log("Delete clicked for row ID:", selectedRowId);
  };

  const handleOnDelete = async (selectedRowId: string) => {
    await deleteSeriesByIdMutateAsync({ SeriesId: selectedRowId });
    managerSeriesForTableRefetch();
  };

  const handleOnDeleteMultipleSeries = async () => {
    await deleteMultipleSeriesByIdzMutateAsync({ SeriesIdz: rowSelectionModel });
    managerSeriesForTableRefetch();
  };

  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    padding: theme.spacing(4),
  }));

  const tableActions = (
    <Stack gap={1} direction={"row"} alignItems={"center"}>
      <CachedIcon tooltip={t("Feature.SeriesManagement.SeriesManagementScreen.refetch")} onClick={managerSeriesForTableRefetch} />
      <SearchIcon tooltip={t("Feature.SeriesManagement.SeriesManagementScreen.search")} onClick={handleOnDeleteMultipleSeries} />
      <DeleteIcon tooltip={t("Feature.SeriesManagement.SeriesManagementScreen.deleteSelected")} color="error" onClick={handleOnDeleteMultipleSeries} loading={isDeleteMultipleSeriesLoading} />
      <EditIcon tooltip={t("Feature.SeriesManagement.SeriesManagementScreen.editSelected")} color="primary" onClick={() => {}} />
      <Tooltip title={t("Feature.SeriesManagement.SeriesManagementScreen.autoSave")}>
        <Switch />
      </Tooltip>
      <Button onClick={handleOnCreateSeriesClick}>{t("Feature.SeriesManagement.SeriesManagementScreen.createSeries")}</Button>
    </Stack>
  );

  const tableHeader = (
    <Stack direction={"row"} mb={2} justifyContent={"space-between"} alignItems={"center"}>
      <Typography variant="h5">{t("Feature.SeriesManagement.SeriesManagementScreen.manageSeries")}</Typography>
      {tableActions}
    </Stack>
  );

  const tableFooter = (
    <Stack direction={"row"} justifyContent={"end"} mt={2} gap={1}>
      <Button variant="text">{t("Feature.SeriesManagement.SeriesManagementScreen.cancel")}</Button>
      <Button endIcon={<SaveIcon />} variant="contained">
        {t("Feature.SeriesManagement.SeriesManagementScreen.save")}
      </Button>
    </Stack>
  );

  return (
    <Page>
      <Card sx={cardStyle}>
        {tableHeader}
        <FullFeaturedCrudGrid />
        <SeriesTable
          rows={managerSeriesForTableData?.seriesList ?? []}
          onEdit={handleOnEdit}
          onDelete={handleOnDelete}
          onPreview={handleOnPreview}
          onRefresh={managerSeriesForTableRefetch}
          onSeasonCreate={handleOnSeasonCreate}
          onSelect={handleOnSelect}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          isLoading={isManagerSeriesForTableLoading}
          totalRecords={managerSeriesForTableData?.totalRecords ?? 0}
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={setRowSelectionModel}
        />
        {tableFooter}
      </Card>
    </Page>
  );
}
