import { useState } from "react";
import { useGetManagerSeriesWithImage, useGetSeasonBySeriesId } from "../../hooks";
import { useTranslation } from "react-i18next";
import { AddIcon, CachedIcon, ChevronLeftIcon, ClearIcon, ErrorIcon, UploadIcon } from "@/components/icons";
import { Dialog, DialogActions, DialogTitle } from "@/components/Dialog";
import Button from "@/components/Button";
import useNavigation from "@/navigation/useNavigation";
import SeasonListForSelection from "./SeasonListForSelection";
import SeriesListForSelection from "./SeriesListForSelection";
import { DialogContent } from "@mui/material";
import { GetManagerSeriesWithImageOutput, Season } from "mirra-scope-client-types/lib";

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
    <Dialog onClose={handleOnClose} open={isVisible}>
      <DialogTitle variant="h5" flexDirection={"row"} justifyContent={"space-between"} display={"flex"} alignItems={"center"} displayPrint={"block"}>
        {selectedSeries ? selectedSeries.mediaBasicInfo.title : t("Feature.VideoUpload.SelectSeriesAndSeasonModal.headerText")}
        <ClearIcon onClick={onClose} />
      </DialogTitle>
      <DialogContent sx={{ p: 0 }} dividers>
        {selectedSeries ? <SeasonListForSelection isLoading={isSeasonFetching} seasons={selectedSeriesSeasons} selectedSeasonId={selectedSeasonId} onSelectedSeason={(id) => setSelectedSeasonId(id)} /> : <SeriesListForSelection seriesList={managerSeries ?? []} onSelectedSeries={handleOnFetchSeasons} isLoading={isManagerSeriesFetching} />}
      </DialogContent>
      {selectedSeries ? renderSeasonListFooter : renderSeriesListFooter}
    </Dialog>
  );
}
