import { forwardRef, MouseEvent, Ref, Suspense, useEffect, useImperativeHandle, useState, useId, useCallback } from "react";
import { lazily } from "react-lazily";
import { PopoverPosition, Rating, Stack } from "@mui/material";
import { GridActionsCellItem, GridColDef, GridPaginationModel, GridRowModel, GridRowSelectionModel } from "@mui/x-data-grid-pro";
import { format } from "date-fns";
import { noop, values as convertEnumToArray, debounce } from "lodash";
import { GetManagerTableMovieListOutput, MediaStatusEnum } from "zgaya.hub-client-types/lib";

import { DEFAULT_DATE_FORMAT, DEFAULT_MONTH_YEAR_FORMAT } from "@/mock/constants";

import { DEFAULT_PAGINATION_DATE } from "../constants";
import { useDeleteMultipleMovieByIdz, useGetManagerMovieForTable, useUpdateMovie } from "../hooks";
import { useTranslation } from "react-i18next";
import { MovieStatusChip } from ".";
import { SearchInput } from "@/components/Form";

const { MovieRowContextMenu } = lazily(() => import("."));
const { MediaTableCard } = lazily(() => import("@/components/Cards"));
const { DataGridPro } = lazily(() => import("@/components/DataGridPro"));
const { MoreVertIcon, OpenTabIcon } = lazily(() => import("@/components/icons"));
const { LinearProgress } = lazily(() => import("@mui/material"));

export interface MovieTableRefInterface {
  onDeleteMultipleMovie: () => void;
  onSearchToogle: () => void;
  onRefresh: () => void;
  onEditMultipleMovie: () => void;
}

const MovieTable = forwardRef(function MovieTable(_, ref: Ref<MovieTableRefInterface>) {
  const { t } = useTranslation();
  const [selectedRowId, setSelectedRowId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(DEFAULT_PAGINATION_DATE);
  const [contextMenuAnchorPosition, setContextMenuAnchorPosition] = useState<PopoverPosition | null>(null);

  const { mutateAsync: deleteMultipleMovieByIdzMutateAsync, isPending: isDeleteMultipleMovieLoading } = useDeleteMultipleMovieByIdz();
  const { mutateAsync: updateMovieMutateAsync, isPending: isUpdateMovieLoading } = useUpdateMovie();
  const { data: managerMovieForTableData, refetch: managerMovieForTableRefetch, isLoading: isManagerMovieForTableLoading } = useGetManagerMovieForTable({ Page: paginationModel.page, PageSize: paginationModel.pageSize, SearchText: searchText });

  useImperativeHandle(ref, () => ({
    onRefresh: () => managerMovieForTableRefetch(),
    //TODO: should show confirmation modal to delete multiple movies and also i will not call when movies not selected
    onDeleteMultipleMovie: handleOnDeleteMultipleMovie,
    onEditMultipleMovie: noop,
    onSearchToogle: handleOnToggleSearchBox,
  }));

  useEffect(() => {
    if (managerMovieForTableData) {
      managerMovieForTableRefetch();
    }
  }, [paginationModel]);

  const handleOnSearchChange = debounce((text) => {
    setSearchText(text);
  }, 1000);

  const handleOnContextMenu = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setSelectedRowId(event.currentTarget.getAttribute("data-id") ?? "");
    setContextMenuAnchorPosition({ left: event.clientX - 2, top: event.clientY - 4 });
  };

  const processRowUpdate = async (movie: GridRowModel<GetManagerTableMovieListOutput>) => {
    //TODO: here is problem is that i can remove value from cell but value should not be remove
    await updateMovieMutateAsync({ MovieId: movie.ID }, { AdditionalInfo: { Status: movie.status }, ReleaseDate: movie.releaseDate });
    return movie;
  };

  const handleOnDeleteMultipleMovie = async () => {
    await deleteMultipleMovieByIdzMutateAsync({ MovieIdz: rowSelectionModel });
    managerMovieForTableRefetch();
  };

  const handleOnSelect = (selectedRowId: string) => {
    setRowSelectionModel((v) => [...v, selectedRowId]);
  };

  const handleOnToggleSearchBox = () => {
    setIsSearchBoxVisible(!isSearchBoxVisible);
  };

  // TODO: columns should change with engagement columns
  const MovieTableColumn: GridColDef[] = [
    {
      field: "movie",
      headerName: t("Feature.Movie.MovieTable.movie"),
      width: 500,
      renderCell: (params) => <MediaTableCard imageSrc={params.row.thumbnailUrl} title={params.row.title} description={params.row.plotSummary} />,
    },
    {
      field: "releaseDate",
      headerName: t("Feature.Movie.MovieTable.releaseDate"),
      width: 200,
      type: "dateTime",
      editable: true,
      valueFormatter: (params) => format(params.value, DEFAULT_MONTH_YEAR_FORMAT),
    },
    {
      field: "thumbnailUrl",
      headerName: t("Feature.Movie.MovieTable.thumbnailUrl"),
      width: 150,
      renderCell: (params) => <OpenTabIcon fontSize="small" onClick={() => window.open(params.value, "_blank", "width=600,height=350")} />,
    },
    {
      field: "uploadDate",
      headerName: t("Feature.Movie.MovieTable.uploadDate"),
      width: 150,
      valueFormatter: (params) => format(params.value, DEFAULT_DATE_FORMAT),
    },
    {
      field: "avarageRating",
      headerName: t("Feature.Movie.MovieTable.avarageRatings"),
      width: 200,
      renderCell: (params) => <Rating value={params.row.avarageRating} precision={0.5} readOnly />,
    },
    {
      field: "likeCount",
      headerName: t("Feature.Movie.MovieTable.totalLikes"),
      width: 120,
    },
    {
      field: "status",
      headerName: t("Feature.Movie.MovieTable.status"),
      width: 200,
      type: "singleSelect",
      valueOptions: convertEnumToArray(MediaStatusEnum),
      editable: true,
      renderCell: (params) => <MovieStatusChip status={params.row.status} />,
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
      {isSearchBoxVisible ? <SearchInput placeholder={t("Feature.Movie.MovieTable.searchInputPlaceholder")} autoFocus size="small" onChange={handleOnSearchChange} /> : null}
      <DataGridPro
        pagination
        getRowHeight={() => "auto"}
        rows={managerMovieForTableData?.movieList ?? []}
        checkboxSelection
        disableRowSelectionOnClick
        loading={isManagerMovieForTableLoading || isUpdateMovieLoading || isDeleteMultipleMovieLoading}
        getRowId={(row) => row.ID}
        columns={MovieTableColumn}
        rowCount={managerMovieForTableData?.totalRecords}
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
      {/*TODO: one more problem is that mark is not working as expecting like its detect all rows selectiong by number of rows ot by idz */}
      <MovieRowContextMenu movieId={selectedRowId} isOpen={!!contextMenuAnchorPosition} anchorPosition={contextMenuAnchorPosition!} onSelect={() => handleOnSelect(selectedRowId)} onRefresh={() => managerMovieForTableRefetch()} onClose={() => setContextMenuAnchorPosition(null)} />
    </Suspense>
  );
});
export default MovieTable;
