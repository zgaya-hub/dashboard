import { useState } from "react";
import { DialogActions } from "@mui/material";
import { useGetManagerSeriesWithImageAndBasicInfo, useGetSeasonBySeriesId } from "../../hooks/queryHooks";
import { GetManagerSeriesWithImageAndBasicInfoOutput, GetSeasonBySeriesIdOutput } from "../../hooks/queryHooks.types";
import { useTranslation } from "react-i18next";
import { AddIcon, CachedIcon, ChevronLeftIcon, UploadIcon } from "@/components/icons";
import { Dialog } from "@/components/Dialog";
import Button from "@/components/Button";
import useNavigation from "@/navigation/use-navigation";
import SeasonListForSelection from "./SeasonListForSelection";
import SeriesListForSelection from "./SeriesListForSelection";

interface SelectSeriesAndSeasonModalProps {
  isVisible: boolean;
  onNext: (seasonId: string) => void;
}

export default function SelectSeriesAndSeasonModal({ isVisible, onNext }: SelectSeriesAndSeasonModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const [selectedSeries, setSelectedSeries] = useState<GetManagerSeriesWithImageAndBasicInfoOutput | null>(null);
  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);
  const [selectedSeriesSeasons, setSelectedSeriesSeasons] = useState<GetSeasonBySeriesIdOutput[]>([]);
  const { data: managerSeries = [], refetch: refetchManagerSeries, isFetching: isManagerSeriesFetching } = useGetManagerSeriesWithImageAndBasicInfo();
  const { mutateAsync: getSeasonBySeriesIdMutateAsync, isPending: isSeasonFetching } = useGetSeasonBySeriesId();

  const handleOnFetchSeasons = async (series: GetManagerSeriesWithImageAndBasicInfoOutput) => {
    setSelectedSeries(series);
    const result = await getSeasonBySeriesIdMutateAsync({
      SeriesId: series.ID,
    });
    setSelectedSeriesSeasons(result.getSeasonBySeriesId);
  };

  const handleOnClearBothState = () => {
    setSelectedSeasonId(null);
    setSelectedSeries(null);
  };

  const handleOnMovieNavigation = () => {
    navigate.navigate("/video-upload/movie");
  };

  const handleOnTrailerNavigation = () => {
    navigate.navigate("/video-upload/trailer");
  };

  const renderSeasonListFooter = () => (
    <DialogActions>
      <ChevronLeftIcon onClick={handleOnClearBothState} />
      <CachedIcon loading={isSeasonFetching} onClick={() => handleOnFetchSeasons(selectedSeries)} />
      <AddIcon onClick={() => {}} />
      <Button disabled={!selectedSeasonId} onClick={() => onNext(selectedSeasonId)}>
        {t("Feature.VideoUpload.SeriesSelectComponent.next")}
      </Button>
    </DialogActions>
  );

  const renderSeriesListFooter = () => (
    <DialogActions>
      <AddIcon onClick={() => {}} />
      <CachedIcon loading={isManagerSeriesFetching} onClick={refetchManagerSeries} />
      <Button variant="outlined" onClick={handleOnMovieNavigation} startIcon={<UploadIcon />}>
        {t("Feature.VideoUpload.EpisodeUploadModal.movie")}
      </Button>
      <Button variant="outlined" onClick={handleOnTrailerNavigation} startIcon={<UploadIcon />}>
        {t("Feature.VideoUpload.EpisodeUploadModal.trailer")}
      </Button>
    </DialogActions>
  );

  return (
    <Dialog onClose={() => setSelectedSeries(null)} headerText={selectedSeries ? selectedSeries.mediaBasicInfo.mediaTitle : t("Feature.VideoUpload.SeriesSelectComponent.title")} hideCrossButton open={isVisible}>
      {selectedSeries ? <SeasonListForSelection isLoading={isSeasonFetching} seasons={selectedSeriesSeasons} selectedSeasonId={selectedSeasonId} onSelectedSeason={(id) => setSelectedSeasonId(id)} /> : <SeriesListForSelection seriesList={managerSeries} onSelectedSeries={handleOnFetchSeasons} isLoading={isManagerSeriesFetching} />}
      {selectedSeries ? renderSeasonListFooter() : renderSeriesListFooter()}
    </Dialog>
  );
}
