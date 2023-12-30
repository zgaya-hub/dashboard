import { useState, MouseEvent, Fragment } from "react";
import { GridColDef, GridEventListener, GridPaginationModel, GridRowSelectionModel } from "@mui/x-data-grid-pro";
import { SeriesRowContextMenu } from "../components";
import { ManagerTableSeriesList } from "../types";
import { format } from "date-fns";
import { DEFAULT_DATE_FORMAT, DEFAULT_MONTH_YEAR_FORMAT } from "@/mock/constants";
import { OpenTabIcon } from "@/components/icons";
import { values as convertEnumToArray } from "lodash";
import { MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "@/types/enum";
import { DataGridPro } from "@/components/DataGridPro";
import { PopoverPosition } from "@mui/material";

interface SeriesTableProps {
  rows: ManagerTableSeriesList[];
  isLoading: boolean;
  totalRecords: number;
  paginationModel: GridPaginationModel;
  rowSelectionModel: GridRowSelectionModel;
  onRefresh: () => void;
  onEdit: (seriesId: string) => void;
  onDelete: (seriesId: string) => void;
  onPreview: (seriesId: string) => void;
  onSelect: (seriesId: string) => void;
  onSeasonCreate: (seriesId: string) => void;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  onRowSelectionModelChange: (model: GridRowSelectionModel) => void;
}

export default function SeriesTable({
  rows,
  totalRecords,
  onEdit,
  onDelete,
  paginationModel,
  onPaginationModelChange,
  isLoading,
  onPreview,
  onRefresh,
  onSeasonCreate,
  onSelect,
  onRowSelectionModelChange,
  rowSelectionModel,
}: SeriesTableProps) {
  const [contextMenuAnchorPosition, setContextMenuAnchorPosition] = useState<PopoverPosition | null>(null);
  const [selectedRowId, setSelectedRowId] = useState("");

  const handleOnContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setSelectedRowId(event.currentTarget.getAttribute("data-id") ?? "");
    setContextMenuAnchorPosition({ left: event.clientX - 2, top: event.clientY - 4 });
  };

  const handleOnRowEditCommit = (event: GridEventListener<'rowEditCommit'>) => {
    console.log(event);
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
      type: "singleSelect",
      valueOptions: convertEnumToArray(MediaCountriesEnum),
      editable: true,
    },
    {
      field: "mediaOriginalLanguage",
      headerName: "Original language",
      width: 200,
      type: "singleSelect",
      valueOptions: convertEnumToArray(MediaLanguagiesEnum),
      editable: true,
    },
    {
      field: "mediaGenre",
      headerName: "Genre",
      width: 200,
      type: "singleSelect",
      valueOptions: convertEnumToArray(MediaGenriesEnum),
      editable: true,
    },
    {
      field: "mediaStatus",
      headerName: "Status",
      width: 200,
      type: "singleSelect",
      valueOptions: convertEnumToArray(MediaStatusEnum),
      editable: true,
    },
    {
      field: "mediaTitle",
      headerName: "Title",
      width: 200,
      editable: true,
    },
    {
      field: "mediaPlotSummary",
      headerName: "Plot summary",
      width: 200,
      editable: true,
    },
    {
      field: "mediaReleaseDate",
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
  ];

  return (
    <Fragment>
      <DataGridPro
        pagination
        rows={rows ?? []}
        checkboxSelection
        disableRowSelectionOnClick
        loading={isLoading}
        getRowId={(row) => row.ID}
        columns={SeriesTableColumn}
        rowCount={totalRecords}
        pageSizeOptions={[7, 15, 20]}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        paginationMode="server"
        onRowSelectionModelChange={onRowSelectionModelChange}
        rowSelectionModel={rowSelectionModel}
        onRowEditCommit={handleOnRowEditCommit}
        slotProps={{
          row: {
            onContextMenu: handleOnContextMenu,
          },
        }}
      />
      <SeriesRowContextMenu
        onRefresh={onRefresh}
        isOpen={!!contextMenuAnchorPosition}
        anchorPosition={contextMenuAnchorPosition}
        onPreview={() => onPreview(selectedRowId)}
        onSeasonCreate={() => onSeasonCreate(selectedRowId)}
        onSelect={() => onSelect(selectedRowId)}
        onEdit={() => onEdit(selectedRowId)}
        onDelete={() => onDelete(selectedRowId)}
        onClose={() => setContextMenuAnchorPosition(null)}
      />
    </Fragment>
  );
}
