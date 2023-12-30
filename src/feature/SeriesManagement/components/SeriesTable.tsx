import { useState, MouseEvent, Fragment, useCallback } from "react";
import { GridActionsCellItem, GridColDef, GridPaginationModel, GridRowModel, GridRowSelectionModel } from "@mui/x-data-grid-pro";
import { SeriesRowContextMenu } from "../components";
import { TableSeriesInterface } from "../types";
import { format } from "date-fns";
import { DEFAULT_DATE_FORMAT, DEFAULT_MONTH_YEAR_FORMAT } from "@/mock/constants";
import { MoreVertIcon, OpenTabIcon } from "@/components/icons";
import { values as convertEnumToArray } from "lodash";
import { MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "@/types/enum";
import { DataGridPro } from "@/components/DataGridPro";
import { LinearProgress, PopoverPosition } from "@mui/material";

interface SeriesTableProps {
  rows: TableSeriesInterface[];
  isQueryLoading: boolean;
  isMutateLoading: boolean;
  totalRecords: number;
  paginationModel: GridPaginationModel;
  rowSelectionModel: GridRowSelectionModel;
  onRefresh: () => void;
  onSelect: (seriesId: string) => void;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  onRowSelectionModelChange: (model: GridRowSelectionModel) => void;
  onSeriesUpdate: (series: TableSeriesInterface) => void;
  isAutoSave: boolean;
}

export default function SeriesTable({
  rows,
  totalRecords,
  paginationModel,
  isMutateLoading,
  onPaginationModelChange,
  isQueryLoading,
  onRefresh,
  onSelect,
  onRowSelectionModelChange,
  onSeriesUpdate,
  isAutoSave,
  rowSelectionModel,
}: SeriesTableProps) {
  const [contextMenuAnchorPosition, setContextMenuAnchorPosition] = useState<PopoverPosition | null>(null);
  const [selectedRowId, setSelectedRowId] = useState("");

  const handleOnContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setSelectedRowId(event.currentTarget.getAttribute("data-id") ?? "");
    setContextMenuAnchorPosition({ left: event.clientX - 2, top: event.clientY - 4 });
  };

  const processRowUpdate = useCallback(async (series: GridRowModel<TableSeriesInterface>) => {
    if (isAutoSave) {
      onSeriesUpdate(series);
    }
    return series;
  }, []);

  const SeriesTableColumn: GridColDef[] = [
    {
      field: "ID",
      headerName: "ID",
      width: 200,
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
      field: "title",
      headerName: "Title",
      width: 200,
      editable: true,
    },
    {
      field: "plotSummary",
      headerName: "Plot summary",
      width: 200,
      editable: true,
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
      field: "mediaImageUrl",
      headerName: "Image url",
      width: 100,
      editable: true,
      renderCell: (params) => <OpenTabIcon fontSize="small" onClick={() => window.open(params.value, "_blank", "width=600,height=350")} />,
    },
    {
      field: "createdAt",
      headerName: "Created at",
      width: 200,
      valueFormatter: (params) => format(params.value, DEFAULT_DATE_FORMAT),
    },
    {
      field: "updatedAt",
      headerName: "Updated at",
      width: 200,
      valueFormatter: (params) => (params.value ? format(params.value, DEFAULT_DATE_FORMAT) : null),
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
    <Fragment>
      {isMutateLoading ? <LinearProgress /> : null}
      <DataGridPro
        pagination
        rows={rows ?? []}
        checkboxSelection
        disableRowSelectionOnClick
        loading={isQueryLoading}
        getRowId={(row) => row.ID}
        columns={SeriesTableColumn}
        rowCount={totalRecords}
        pageSizeOptions={[7, 15, 20]}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        paginationMode="server"
        onRowSelectionModelChange={onRowSelectionModelChange}
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
      <SeriesRowContextMenu
        seriesId={selectedRowId}
        isOpen={!!contextMenuAnchorPosition}
        anchorPosition={contextMenuAnchorPosition}
        onSelect={() => onSelect(selectedRowId)}
        onRefresh={onRefresh}
        onClose={() => setContextMenuAnchorPosition(null)}
      />
    </Fragment>
  );
}
