import { useEffect, useState } from "react";
import Page from "@/components/Page";
import { Card, Stack, Switch, SxProps, Typography } from "@mui/material";
import Button from "@/components/Button";
import useNavigation from "@/navigation/use-navigation";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { useTranslation } from "react-i18next";
import { DEFAULT_PAGINATION_DATE } from "../constants";
import { GridPaginationModel, GridRowSelectionModel } from "@mui/x-data-grid-pro";
import { useDeleteMultipleSeriesByIdz, useGetManagerSeriesForTable, useUpdateSeries } from "../hooks/queryHooks";
import { CachedIcon, DeleteIcon, EditIcon, SaveIcon, SearchIcon } from "@/components/icons";
import Tooltip from "@/components/Tooltip";
import { SeriesTable } from "../components";
import { TableSeriesInterface } from "../types";

export default function SeriesManagementScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(DEFAULT_PAGINATION_DATE);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [isAutoSaveChecked, setIsAutoSaveChecked] = useState(false);
  const { mutateAsync: deleteMultipleSeriesByIdzMutateAsync, isPending: isDeleteMultipleSeriesLoading } = useDeleteMultipleSeriesByIdz();
  const { mutateAsync: updateSeriesMutateAsync, isPending: isUpdateSeriesLoading } = useUpdateSeries();
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

  const handleOnSelect = (selectedRowId: string) => {
    console.log("Delete clicked for row ID:", selectedRowId);
  };

  const handleOnUpdateSeries = async (series: TableSeriesInterface) => {
    await updateSeriesMutateAsync({
      input: {
        MediaAdditionalInfo: {
          MediaGenre: series.genre,
          MediaOriginCountry: series.originCountry,
          MediaOriginalLanguage: series.originalLanguage,
          MediaStatus: series.status,
        },
        MediaBasicInfo: {
          MediaPlotSummary: series.plotSummary,
          MediaReleaseDate: series.releaseDate,
          MediaTitle: series.title,
        },
        MediaImage: {
          MediaImageUrl: series.mediaImageUrl,
        },
      },
      param: { SeriesId: series.ID },
    });
  };

  const handleOnDeleteMultipleSeries = async () => {
    await deleteMultipleSeriesByIdzMutateAsync({ SeriesIdz: rowSelectionModel });
    managerSeriesForTableRefetch();
  };

  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    padding: theme.spacing(4),
  }));

  return (
    <Page>
      <Card sx={cardStyle}>
        <Stack direction={"row"} mb={2} justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h5">{t("Feature.SeriesManagement.SeriesManagementScreen.manageSeries")}</Typography>
          <Stack gap={1} direction={"row"} alignItems={"center"}>
            <CachedIcon tooltip={t("Feature.SeriesManagement.SeriesManagementScreen.refetch")} onClick={managerSeriesForTableRefetch} />
            <SearchIcon tooltip={t("Feature.SeriesManagement.SeriesManagementScreen.search")} onClick={handleOnDeleteMultipleSeries} />
            <DeleteIcon
              disabled={!rowSelectionModel.length}
              tooltip={t("Feature.SeriesManagement.SeriesManagementScreen.deleteSelected")}
              color="error"
              onClick={handleOnDeleteMultipleSeries}
              loading={isDeleteMultipleSeriesLoading}
            />
            <EditIcon disabled={!rowSelectionModel.length} tooltip={t("Feature.SeriesManagement.SeriesManagementScreen.editSelected")} color="primary" onClick={() => {}} />
            <Tooltip title={t("Feature.SeriesManagement.SeriesManagementScreen.autoSave")}>
              <Switch value={isAutoSaveChecked} onChange={(e) => setIsAutoSaveChecked(e.target.checked)} />
            </Tooltip>
            <Button onClick={handleOnCreateSeriesClick}>{t("Feature.SeriesManagement.SeriesManagementScreen.createSeries")}</Button>
          </Stack>
        </Stack>
        <SeriesTable
          onSeriesUpdate={handleOnUpdateSeries}
          rows={managerSeriesForTableData?.seriesList ?? []}
          onRefresh={managerSeriesForTableRefetch}
          onSelect={handleOnSelect}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          totalRecords={managerSeriesForTableData?.totalRecords ?? 0}
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={setRowSelectionModel}
          isAutoSave={isAutoSaveChecked}
          isQueryLoading={isManagerSeriesForTableLoading}
          isMutateLoading={isUpdateSeriesLoading || isDeleteMultipleSeriesLoading}
        />
        <Stack direction={"row"} justifyContent={"end"} mt={2} gap={1}>
          <Button variant="text">{t("Feature.SeriesManagement.SeriesManagementScreen.cancel")}</Button>
          <Button endIcon={<SaveIcon />} variant="contained">
            {t("Feature.SeriesManagement.SeriesManagementScreen.save")}
          </Button>
        </Stack>
      </Card>
    </Page>
  );
}
