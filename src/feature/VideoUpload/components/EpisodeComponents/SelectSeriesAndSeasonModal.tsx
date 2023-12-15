import { useState } from "react";
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
    <>
      <ChevronLeftIcon tooltip={t("Feature.VideoUpload.SelectSeriesAndSeasonModal.back")} tooltipPlacement="top" onClick={handleOnClearBothState} />
      <AddIcon tooltip={t("Feature.VideoUpload.SelectSeriesAndSeasonModal.addNewSeries")} tooltipPlacement="top" onClick={() => {}} />
      <CachedIcon tooltip={t("Feature.VideoUpload.SelectSeriesAndSeasonModal.refreshList")} tooltipPlacement="top" loading={isSeasonFetching} onClick={() => handleOnFetchSeasons(selectedSeries)} />
      <Button disabled={!selectedSeasonId} onClick={() => onNext(selectedSeasonId)}>
        {t("Feature.VideoUpload.SelectSeriesAndSeasonModal.next")}
      </Button>
    </>
  );

  const renderSeriesListFooter = () => (
    <>
      <AddIcon tooltip={t("Feature.VideoUpload.SelectSeriesAndSeasonModal.addNewSeries")} tooltipPlacement="top" onClick={() => {}} />
      <CachedIcon tooltip={t("Feature.VideoUpload.SelectSeriesAndSeasonModal.refreshList")} tooltipPlacement="top" loading={isManagerSeriesFetching} onClick={refetchManagerSeries} />
      <Button variant="outlined" onClick={handleOnMovieNavigation} startIcon={<UploadIcon />}>
        {t("Feature.VideoUpload.SelectSeriesAndSeasonModal.movie")}
      </Button>
      <Button variant="outlined" onClick={handleOnTrailerNavigation} startIcon={<UploadIcon />}>
        {t("Feature.VideoUpload.SelectSeriesAndSeasonModal.trailer")}
      </Button>
    </>
  );

  return (
    <Dialog dialogContentSx={{ padding: 0 }} onClose={() => setSelectedSeries(null)} headerText={selectedSeries ? selectedSeries.mediaBasicInfo.mediaTitle : t("Feature.VideoUpload.SelectSeriesAndSeasonModal.headerText")} hideCrossButton open={isVisible} dialogAction={selectedSeries ? renderSeasonListFooter() : renderSeriesListFooter()}>
      {selectedSeries ? <SeasonListForSelection isLoading={isSeasonFetching} seasons={selectedSeriesSeasons} selectedSeasonId={selectedSeasonId} onSelectedSeason={(id) => setSelectedSeasonId(id)} /> : <SeriesListForSelection seriesList={managerSeries} onSelectedSeries={handleOnFetchSeasons} isLoading={isManagerSeriesFetching} />}
    </Dialog>
  );
}
