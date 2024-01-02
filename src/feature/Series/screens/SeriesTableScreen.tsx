import { useEffect, useState } from "react";
import Page from "@/components/Page";
import { Card, Hidden, Menu, MenuItem, Stack, SxProps, Typography } from "@mui/material";
import Button from "@/components/Button";
import useNavigation from "@/navigation/useNavigation";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { useTranslation } from "react-i18next";
import { DEFAULT_PAGINATION_DATE } from "../constants";
import { GridPaginationModel, GridRowSelectionModel } from "@mui/x-data-grid-pro";
import { useDeleteMultipleSeriesByIdz, useGetManagerSeriesForTable, useUpdateSeries } from "../hooks";
import { AddIcon, CachedIcon, DeleteIcon, EditIcon, MoreVertIcon, SaveIcon, SearchIcon } from "@/components/icons";
import { SeriesTable } from "../components";
import { TableSeriesInterface } from "../types";

export default function SeriesTableScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [actionMenuEnchorEl, setActionMenuEnchorEl] = useState<HTMLElement | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(DEFAULT_PAGINATION_DATE);
  const { mutateAsync: deleteMultipleSeriesByIdzMutateAsync, isPending: isDeleteMultipleSeriesLoading } = useDeleteMultipleSeriesByIdz();
  const { mutateAsync: updateSeriesMutateAsync, isPending: isUpdateSeriesLoading } = useUpdateSeries();
  const { data: managerSeriesForTableData, refetch: managerSeriesForTableRefetch, isLoading: isManagerSeriesForTableLoading } = useGetManagerSeriesForTable({ Page: paginationModel.page, PageSize: paginationModel.pageSize });

  useEffect(() => {
    if (managerSeriesForTableData) {
      managerSeriesForTableRefetch();
    }
  }, [paginationModel]);

  const handleOnCreateSeriesClick = () => {
    navigation.navigate("/series/create");
  };

  const handleOnSelect = (selectedRowId: string) => {
    console.log("Delete clicked for row ID:", selectedRowId);
  };

  const handleOnUpdateSeries = async (series: TableSeriesInterface) => {
    await updateSeriesMutateAsync(
      { SeriesId: series.ID },
      {
        MediaAdditionalInfo: {
          Genre: series.genre,
          Status: series.status,
        },
        MediaBasicInfo: {
          ReleaseDate: series.releaseDate,
          Title: series.title,
        },
        Image: {
          ImageUrl: series.imageUrl,
        },
      }
    );
  };

  const handleOnDeleteMultipleSeries = async () => {
    await deleteMultipleSeriesByIdzMutateAsync({ SeriesIdz: rowSelectionModel });
    managerSeriesForTableRefetch();
  };

  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    padding: theme.spacing(4),
  }));

  const actionMenu = (
    <Menu open={!!actionMenuEnchorEl} onClose={() => setActionMenuEnchorEl(null)} anchorEl={actionMenuEnchorEl} onClick={() => setActionMenuEnchorEl(null)}>
      <MenuItem onClick={() => managerSeriesForTableRefetch()}>
        <CachedIcon tooltip={t("Feature.Series.SeriesScreen.refetch")} />
      </MenuItem>
      <MenuItem onClick={handleOnDeleteMultipleSeries}>
        <SearchIcon tooltip={t("Feature.Series.SeriesScreen.search")} />
      </MenuItem>
      <MenuItem disabled={!rowSelectionModel.length} onClick={handleOnDeleteMultipleSeries}>
        <DeleteIcon disabled={!rowSelectionModel.length} tooltip={t("Feature.Series.SeriesScreen.deleteSelected")} color="error" loading={isDeleteMultipleSeriesLoading} />
      </MenuItem>
      <MenuItem disabled={!rowSelectionModel.length} onClick={() => {}}>
        <EditIcon disabled={!rowSelectionModel.length} tooltip={t("Feature.Series.SeriesScreen.editSelected")} color="primary" />
      </MenuItem>
    </Menu>
  );

  return (
    <Page>
      <Card sx={cardStyle}>
        <Stack direction={"row"} mb={2} justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h5">{t("Feature.Series.SeriesScreen.manageSeries")}</Typography>
          <Stack gap={1} direction={"row"} alignItems={"center"}>
            <Hidden mdDown>
              <CachedIcon tooltip={t("Feature.Series.SeriesScreen.refetch")} onClick={() => managerSeriesForTableRefetch()} />
              <SearchIcon tooltip={t("Feature.Series.SeriesScreen.search")} onClick={handleOnDeleteMultipleSeries} />
              <DeleteIcon disabled={!rowSelectionModel.length} tooltip={t("Feature.Series.SeriesScreen.deleteSelected")} color="error" onClick={handleOnDeleteMultipleSeries} loading={isDeleteMultipleSeriesLoading} />
              <EditIcon disabled={!rowSelectionModel.length} tooltip={t("Feature.Series.SeriesScreen.editSelected")} color="primary" onClick={() => {}} />
            </Hidden>
            <Hidden smDown>
              <Button onClick={handleOnCreateSeriesClick}>{t("Feature.Series.SeriesScreen.createSeries")}</Button>
            </Hidden>
            <Hidden smUp>
              <AddIcon iconButtonProps={{ color: "primary" }} onClick={handleOnCreateSeriesClick} tooltip={t("Feature.Series.SeriesScreen.createSeries")} />
            </Hidden>
            <Hidden mdUp>
              <MoreVertIcon onClick={(e) => setActionMenuEnchorEl(e.currentTarget)} />
              {actionMenu}
            </Hidden>
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
          isQueryLoading={isManagerSeriesForTableLoading}
          isMutateLoading={isUpdateSeriesLoading || isDeleteMultipleSeriesLoading}
        />
        <Stack direction={"row"} justifyContent={"end"} mt={2} gap={1}>
          <Button variant="text">{t("Feature.Series.SeriesScreen.cancel")}</Button>
          <Button endIcon={<SaveIcon />} variant="contained">
            {t("Feature.Series.SeriesScreen.save")}
          </Button>
        </Stack>
      </Card>
    </Page>
  );
}
