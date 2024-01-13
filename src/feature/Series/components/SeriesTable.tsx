import { forwardRef, Fragment, MouseEvent, Ref, Suspense, useEffect, useImperativeHandle, useState } from "react";
import { lazily } from "react-lazily";
import { PopoverPosition } from "@mui/material";
import { GridActionsCellItem, GridColDef, GridPaginationModel, GridRowModel, GridRowSelectionModel } from "@mui/x-data-grid-pro";
import { format } from "date-fns";
import { noop, values as convertEnumToArray } from "lodash";
import { MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";

import { DEFAULT_DATE_FORMAT, DEFAULT_MONTH_YEAR_FORMAT } from "@/mock/constants";

import { DEFAULT_PAGINATION_DATE } from "../constants";
import { useDeleteMultipleSeriesByIdz, useGetManagerSeriesForTable, useUpdateSeries } from "../hooks";
import { TableSeriesInterface } from "../types";

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
  const [contextMenuAnchorPosition, setContextMenuAnchorPosition] = useState<PopoverPosition | null>(null);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(DEFAULT_PAGINATION_DATE);
  const [selectedRowId, setSelectedRowId] = useState("");

  const { mutateAsync: deleteMultipleSeriesByIdzMutateAsync, isPending: isDeleteMultipleSeriesLoading } = useDeleteMultipleSeriesByIdz();
  const { mutateAsync: updateSeriesMutateAsync, isPending: isUpdateSeriesLoading } = useUpdateSeries();
  const { data: managerSeriesForTableData, refetch: managerSeriesForTableRefetch, isLoading: isManagerSeriesForTableLoading } = useGetManagerSeriesForTable({ Page: paginationModel.page, PageSize: paginationModel.pageSize });

  useImperativeHandle(ref, () => ({
    onRefresh: () => {
      console.log("Refresh");
    },
    onDeleteMultipleSeries: handleOnDeleteMultipleSeries,
    onEditMultipleSeries: noop,
    onSearchToogle: noop,
  }));

  useEffect(() => {
    if (managerSeriesForTableData) {
      managerSeriesForTableRefetch();
    }
  }, [paginationModel]);

  const handleOnContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setSelectedRowId(event.currentTarget.getAttribute("data-id") ?? "");
    setContextMenuAnchorPosition({ left: event.clientX - 2, top: event.clientY - 4 });
  };

  const processRowUpdate = async (series: GridRowModel<TableSeriesInterface>) => {
    await updateSeriesMutateAsync(
      { SeriesId: series.ID },
      {
        AdditionalInfo: {
          Genre: series.genre,
          Status: series.status,
          OriginalLanguage: series.originalLanguage,
          OriginCountry: series.originCountry,
        },
        ReleaseDate: +series.releaseDate,
        Title: series.title,
        PlotSummary: series.plotSummary,
        Image: {
          Url: series.imageUrl,
        },
      }
    );
    return series;
  };

  const handleOnDeleteMultipleSeries = async () => {
    await deleteMultipleSeriesByIdzMutateAsync({ SeriesIdz: rowSelectionModel });
    managerSeriesForTableRefetch();
  };

  const handleOnSelect = (selectedRowId: string) => {
    alert(selectedRowId);
  };

  const SeriesTableColumn: GridColDef[] = [
    {
      field: "series",
      headerName: "Series",
      width: 500,
      renderCell: params => <MediaTableCard imageSrc={params.row.imageUrl} title={params.row.title} description={params.row.plotSummary} />,
    },
    {
      field: "originCountry",
      headerName: "Origin country",
      width: 200,
      type: "singleSelect",
      valueOptions: convertEnumToArray(MediaCountriesEnum),
      editable: true,
    },
    {
      field: "originalLanguage",
      headerName: "Original language",
      width: 200,
      type: "singleSelect",
      valueOptions: convertEnumToArray(MediaLanguagiesEnum),
      editable: true,
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 200,
      type: "singleSelect",
      valueOptions: convertEnumToArray(MediaGenriesEnum),
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      type: "singleSelect",
      valueOptions: convertEnumToArray(MediaStatusEnum),
      editable: true,
    },
    {
      field: "releaseDate",
      headerName: "Release date",
      width: 200,
      type: "dateTime",
      editable: true,
      valueFormatter: params => format(params.value, DEFAULT_MONTH_YEAR_FORMAT),
    },
    {
      field: "imageUrl",
      headerName: "Image url",
      width: 100,
      editable: true,
      renderCell: params => <OpenTabIcon fontSize="small" onClick={() => window.open(params.value, "_blank", "width=600,height=350")} />,
    },
    {
      field: "uploadDate",
      headerName: "Upload date",
      width: 200,
      valueFormatter: params => format(params.value, DEFAULT_DATE_FORMAT),
    },
    {
      field: "actions",
      type: "actions",
      width: 10,
      pinnable: true,
      getActions: () => [<GridActionsCellItem icon={<MoreVertIcon />} onClick={handleOnContextMenu} />],
    },
  ];

  return (
    <Suspense>
      {isUpdateSeriesLoading || isDeleteMultipleSeriesLoading ? <LinearProgress /> : null}
      <DataGridPro
        pagination
        getRowHeight={() => "auto"}
        rows={managerSeriesForTableData?.seriesList ?? []}
        checkboxSelection
        disableRowSelectionOnClick
        loading={isManagerSeriesForTableLoading}
        getRowId={row => row.ID}
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
        slotProps={{
          row: {
            onContextMenu: handleOnContextMenu,
          },
        }}
      />
      <SeriesRowContextMenu seriesId={selectedRowId} isOpen={!!contextMenuAnchorPosition} anchorPosition={contextMenuAnchorPosition!} onSelect={() => handleOnSelect(selectedRowId)} onRefresh={managerSeriesForTableRefetch} onClose={() => setContextMenuAnchorPosition(null)} />
    </Suspense>
  );
});
export default SeriesTable;
