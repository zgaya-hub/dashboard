import { forwardRef, MouseEvent, Ref, Suspense, useEffect, useImperativeHandle, useState } from "react";
import { lazily } from "react-lazily";
import { DialogContentText, PopoverPosition, Rating } from "@mui/material";
import { GridActionsCellItem, GridColDef, GridPaginationModel, GridRowModel, GridRowSelectionModel } from "@mui/x-data-grid-pro";
import { format } from "date-fns";
import { noop, values as convertEnumToArray, debounce } from "lodash";
import { GetManagerTableOutputSeriesList, MediaCountriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";

import { DEFAULT_DATE_FORMAT, DEFAULT_MONTH_YEAR_FORMAT } from "@/mock/constants";

import { DEFAULT_PAGINATION_DATE } from "../constants";
import { useDeleteMultipleSeriesByIdz, useGetManagerSeriesForTable, useUpdateSeries } from "../hooks";
import { ConfirmationModal } from "@/components/Modals";
import { useTranslation } from "react-i18next";
import { SearchInput } from "@/components/Form";
import { SeriesStatusChip } from ".";

const { SeriesRowContextMenu } = lazily(() => import("."));
const { MediaTableCard } = lazily(() => import("@/components/Cards"));
const { DataGridPro } = lazily(() => import("@/components/DataGridPro"));
const { MoreVertIcon, OpenTabIcon } = lazily(() => import("@/components/icons"));
const { LinearProgress } = lazily(() => import("@mui/material"));

export interface SeriesTableRefInterface {
  onDeleteMultipleSeries: () => void;
  onSearchToogle: () => void;
  onRefresh: () => void;
  onEditMultipleSeries: () => void;
}

const SeriesTable = forwardRef(function SeriesTable(_, ref: Ref<SeriesTableRefInterface>) {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [selectedRowId, setSelectedRowId] = useState("");
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(DEFAULT_PAGINATION_DATE);
  const [contextMenuAnchorPosition, setContextMenuAnchorPosition] = useState<PopoverPosition | null>(null);
  const [isMultipleSeriesDeleteConfirmationModalVisible, setIsMultipleSeriesDeleteConfirmationModalVisible] = useState(false);

  const { mutateAsync: deleteMultipleSeriesByIdzMutateAsync, isPending: isDeleteMultipleSeriesLoading } = useDeleteMultipleSeriesByIdz();
  const { mutateAsync: updateSeriesMutateAsync, isPending: isUpdateSeriesLoading } = useUpdateSeries();
  const { data: managerSeriesForTableData, refetch: managerSeriesForTableRefetch, isLoading: isManagerSeriesForTableLoading } = useGetManagerSeriesForTable({ Page: paginationModel.page, PageSize: paginationModel.pageSize, SearchText: searchText });

  useImperativeHandle(ref, () => ({
    onRefresh: () => managerSeriesForTableRefetch(),
    //TODO:  its calling when no series selected it should not able to call when series not selected
    onDeleteMultipleSeries: handleOnToggleMultipleSeriesDeleteConfirmationModal,
    onEditMultipleSeries: noop,
    onSearchToogle: handleOnToggleSearchBox,
  }));

  useEffect(() => {
    if (managerSeriesForTableData) {
      managerSeriesForTableRefetch();
    }
  }, [paginationModel]);

  const handleOnContextMenu = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setSelectedRowId(event.currentTarget.getAttribute("data-id") ?? "");
    setContextMenuAnchorPosition({ left: event.clientX - 2, top: event.clientY - 4 });
  };

  const processRowUpdate = async (series: GridRowModel<GetManagerTableOutputSeriesList>) => {
    //TODO: here is problem is that i can remove value from cell but value should not be remove
    await updateSeriesMutateAsync({ SeriesId: series.ID }, { AdditionalInfo: { Status: series.status }, ReleaseDate: +series.releaseDate });
    return series;
  };

  const handleOnDeleteMultipleSeries = async () => {
    await deleteMultipleSeriesByIdzMutateAsync({ SeriesIdz: rowSelectionModel });
    managerSeriesForTableRefetch();
  };

  const handleOnSelect = (selectedRowId: string) => {
    setRowSelectionModel((v) => [...v, selectedRowId]);
  };

  const handleOnToggleMultipleSeriesDeleteConfirmationModal = () => {
    setIsMultipleSeriesDeleteConfirmationModalVisible(!isMultipleSeriesDeleteConfirmationModalVisible);
  };

  const handleOnToggleSearchBox = () => {
    setIsSearchBoxVisible(!isSearchBoxVisible);
  };

  const handleOnSearchChange = debounce((text) => {
    setSearchText(text);
  }, 1000);

  // TODO: columns should change with likes, ratings, clicks etc
  const SeriesTableColumn: GridColDef[] = [
    {
      field: "series",
      headerName: "Series",
      width: 500,
      renderCell: (params) => <MediaTableCard imageSrc={params.row.backdropImageUrl} title={params.row.title} description={params.row.plotSummary} />,
    },
    {
      field: "releaseDate",
      headerName: "Release date",
      width: 200,
      type: "dateTime",
      editable: true,
      valueFormatter: (params) => format(params.value, DEFAULT_MONTH_YEAR_FORMAT),
    },
    {
      field: "backdropImageUrl",
      headerName: "Backdrop Url",
      width: 150,
      renderCell: (params) => <OpenTabIcon fontSize="small" onClick={() => window.open(params.value, "_blank", "width=600,height=350")} />,
    },
    {
      field: "uploadDate",
      headerName: "Upload date",
      width: 150,
      valueFormatter: (params) => format(params.value, DEFAULT_DATE_FORMAT),
    },
    {
      field: "avarageRating",
      headerName: "Avarage ratings",
      width: 200,
      renderCell: (params) => <Rating value={params.row.avarageRating} precision={0.5} readOnly />,
    },
    {
      field: "likeCount",
      headerName: "Total likes",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      type: "singleSelect",
      valueOptions: convertEnumToArray(MediaStatusEnum),
      editable: true,
      renderCell: (params) => <SeriesStatusChip status={params.row.status} />,
    },
    {
      field: "actions",
      type: "actions",
      width: 10,
      pinnable: true,
      //TODO: here is a bug those is that when i'm opening context menu by clicking on icon its not detecting target row
      getActions: () => [<GridActionsCellItem label="" onClick={(e) => handleOnContextMenu(e)} icon={<MoreVertIcon />} />],
    },
  ];

  return (
    <Suspense>
      {/* TODO: should change with own i18n */}
      {isSearchBoxVisible ? <SearchInput placeholder={t("Feature.Movie.MovieTable.searchInputPlaceholder")} autoFocus size="small" onChange={handleOnSearchChange} /> : null}
      <DataGridPro
        pagination
        getRowHeight={() => "auto"}
        rows={managerSeriesForTableData?.seriesList ?? []}
        checkboxSelection
        disableRowSelectionOnClick
        loading={isManagerSeriesForTableLoading || isUpdateSeriesLoading || isDeleteMultipleSeriesLoading}
        getRowId={(row) => row.ID}
        columns={SeriesTableColumn}
        rowCount={managerSeriesForTableData?.totalRecords}
        pageSizeOptions={[7, 15, 20]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode="server"
        onRowSelectionModelChange={setRowSelectionModel}
        rowSelectionModel={rowSelectionModel}
        processRowUpdate={processRowUpdate}
        pinnedColumns={{
          right: ["actions"],
        }}
        slots={{
          loadingOverlay: LinearProgress,
        }}
        slotProps={{
          row: {
            onContextMenu: handleOnContextMenu,
          },
        }}
      />

      {/* TODO: one more problem is that mark is not working as expecting like its detect all rows selectiong by number of rows ot by idz */}
      <SeriesRowContextMenu seriesId={selectedRowId} isOpen={!!contextMenuAnchorPosition} anchorPosition={contextMenuAnchorPosition!} onSelect={() => handleOnSelect(selectedRowId)} onRefresh={() => managerSeriesForTableRefetch()} onClose={() => setContextMenuAnchorPosition(null)} />
      <ConfirmationModal onConfirm={handleOnDeleteMultipleSeries} isOpen={isMultipleSeriesDeleteConfirmationModalVisible} onClose={handleOnToggleMultipleSeriesDeleteConfirmationModal} footerText={t("Feature.Series.SeriesTable.deleteMultipleSeriesConfirmationSuggestion")} title={t("Feature.Series.SeriesTable.alert")}>
        <DialogContentText mb={2}>{t("Feature.Series.SeriesTable.deleteMultipleSeriesConfirmationMessage")}</DialogContentText>
      </ConfirmationModal>
    </Suspense>
  );
});
export default SeriesTable;
