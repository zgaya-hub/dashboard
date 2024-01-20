import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { lazily } from "react-lazily";
import { CircularProgress } from "@mui/material";
import { GetManagerSeriesWithImageOutput, Season } from "zgaya.hub-client-types/lib";

import useNavigation from "@/navigation/useNavigation";

import { useGetManagerSeriesWithImage, useGetSeasonBySeriesId } from "../../hooks";

import SeasonListForSelection from "./SeasonListForSelection";
import SeriesListForSelection from "./SeriesListForSelection";

const { DialogContent } = lazily(() => import("@mui/material"));
const Button = lazy(() => import("@/components/Button"));
const { Dialog, DialogActions, DialogTitle } = lazily(() => import("@/components/Dialog"));
const { AddIcon, CachedIcon, ChevronLeftIcon, ClearIcon, ErrorIcon, UploadIcon } = lazily(() => import("@/components/icons"));

interface SelectSeriesAndSeasonModalProps {
  isVisible: boolean;
  onNext: (seasonId: string) => void;
  onClose: () => void;
}

export default function SelectSeriesAndSeasonModal({ isVisible, onNext, onClose }: SelectSeriesAndSeasonModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);
  const [selectedSeriesSeasons, setSelectedSeriesSeasons] = useState<Season[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<GetManagerSeriesWithImageOutput | null>(null);
  const { mutateAsync: getSeasonBySeriesIdMutateAsync, isPending: isSeasonFetching } = useGetSeasonBySeriesId();
  const { isLoading: isManagerSeriesFetching, refetch: refetchManagerSeries, data: managerSeries, error: getManagerSeriesError } = useGetManagerSeriesWithImage();

  const handleOnFetchSeasons = async (series: GetManagerSeriesWithImageOutput) => {
    setSelectedSeries(series);
    const result = await getSeasonBySeriesIdMutateAsync({
      SeriesId: series.ID,
    });
    if (result) {
      setSelectedSeriesSeasons(result);
    }
  };

  const handleOnCreateSeries = () => {
    window.open("/quick/series-create", "_blank", "width=500,height=500");
  };

  const handleOnCreateSeason = () => {
    window.open(`/quick/season-create/${selectedSeries?.ID}`, "_blank", "width=500,height=600");
  };

  const handleOnClearBothState = () => {
    setSelectedSeasonId(null);
    setSelectedSeries(null);
  };

  const handleOnMovieNavigation = () => {
    navigate.navigate("/upload/movie");
  };

  const handleOnTrailerNavigation = () => {
    navigate.navigate("/upload/trailer");
  };

  const handleOnNext = () => {
    onNext(selectedSeasonId!);
    setSelectedSeries(null);
  };

  const handleOnClose = () => {
    setSelectedSeries(null);
    onClose();
  };

  const renderSeasonListFooter = (
    <DialogActions>
      <ChevronLeftIcon tooltip={t("Feature.VideoUpload.SelectSeriesAndSeasonModal.back")} tooltipPlacement="top" onClick={handleOnClearBothState} />
      {getManagerSeriesError ? <ErrorIcon tooltip={getManagerSeriesError?.message} iconButton color="error" /> : null}
      <AddIcon tooltip={t("Feature.VideoUpload.SelectSeriesAndSeasonModal.addNewSeries")} tooltipPlacement="top" onClick={handleOnCreateSeason} />
      <CachedIcon tooltip={t("Feature.VideoUpload.SelectSeriesAndSeasonModal.refreshList")} tooltipPlacement="top" loading={isSeasonFetching} onClick={() => handleOnFetchSeasons(selectedSeries!)} />
      <Button disabled={!selectedSeasonId} onClick={handleOnNext}>
        {t("Feature.VideoUpload.SelectSeriesAndSeasonModal.next")}
      </Button>
    </DialogActions>
  );

  const renderSeriesListFooter = (
    <DialogActions>
      {getManagerSeriesError ? <ErrorIcon tooltip={getManagerSeriesError?.message} iconButton color="error" /> : null}
      <AddIcon tooltip={t("Feature.VideoUpload.SelectSeriesAndSeasonModal.addNewSeries")} tooltipPlacement="top" onClick={handleOnCreateSeries} />
      <CachedIcon tooltip={t("Feature.VideoUpload.SelectSeriesAndSeasonModal.refreshList")} tooltipPlacement="top" loading={isManagerSeriesFetching} onClick={() => refetchManagerSeries()} />
      <Button variant="outlined" onClick={handleOnMovieNavigation} startIcon={<UploadIcon />}>
        {t("Feature.VideoUpload.SelectSeriesAndSeasonModal.movie")}
      </Button>
      <Button variant="outlined" onClick={handleOnTrailerNavigation} startIcon={<UploadIcon />}>
        {t("Feature.VideoUpload.SelectSeriesAndSeasonModal.trailer")}
      </Button>
    </DialogActions>
  );

  return (
    <Suspense fallback={<CircularProgress />}>
      <Dialog onClose={handleOnClose} open={isVisible}>
        <DialogTitle variant="h5" flexDirection={"row"} justifyContent={"space-between"} display={"flex"} alignItems={"center"} >
          {selectedSeries ? selectedSeries.title : t("Feature.VideoUpload.SelectSeriesAndSeasonModal.headerText")}
          <ClearIcon iconButton={false} onClick={onClose} />
        </DialogTitle>
        <DialogContent sx={{ p: 0 }} dividers>
          {selectedSeries ? <SeasonListForSelection isLoading={isSeasonFetching} seasons={selectedSeriesSeasons} selectedSeasonId={selectedSeasonId} onSelectedSeason={id => setSelectedSeasonId(id)} /> : <SeriesListForSelection seriesList={managerSeries ?? []} onSelectedSeries={handleOnFetchSeasons} isLoading={isManagerSeriesFetching} />}
        </DialogContent>
        {selectedSeries ? renderSeasonListFooter : renderSeriesListFooter}
      </Dialog>
    </Suspense>
  );
}
