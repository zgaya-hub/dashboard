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
  onClose: () => void;
}

export default function SelectSeriesAndSeasonModal({ isVisible, onNext, onClose }: SelectSeriesAndSeasonModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const [selectedSeries, setSelectedSeries] = useState<GetManagerSeriesWithImageAndBasicInfoOutput | null>(null);
  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);
  const [selectedSeriesSeasons, setSelectedSeriesSeasons] = useState<GetSeasonBySeriesIdOutput[]>([]);
  const { isFetching: isManagerSeriesFetching, refetch: refetchManagerSeries, data: managerSeries } = useGetManagerSeriesWithImageAndBasicInfo();
  const { mutateAsync: getSeasonBySeriesIdMutateAsync, isPending: isSeasonFetching } = useGetSeasonBySeriesId();

  const handleOnFetchSeasons = async (series: GetManagerSeriesWithImageAndBasicInfoOutput) => {
    setSelectedSeries(series);
    const result = await getSeasonBySeriesIdMutateAsync({
      SeriesId: series.ID,
    });
    setSelectedSeriesSeasons(result);
  };

  const openNewWindow = () => {
    // Open new window only on user interaction
    window.open("/quick-media-management/series-create", "_blank", "width=500,height=500");
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

  const handleOnNext = () => {
    onNext(selectedSeasonId!);
    setSelectedSeries(null);
  };

  const handleOnClose = () => {
    setSelectedSeries(null);
    onClose();
  };

  const renderSeasonListFooter = (
    <>
      <ChevronLeftIcon tooltip={t("Feature.VideoUpload.SelectSeriesAndSeasonModal.back")} tooltipPlacement="top" onClick={handleOnClearBothState} />
      <AddIcon tooltip={t("Feature.VideoUpload.SelectSeriesAndSeasonModal.addNewSeries")} tooltipPlacement="top" onClick={() => {}} />
      <CachedIcon tooltip={t("Feature.VideoUpload.SelectSeriesAndSeasonModal.refreshList")} tooltipPlacement="top" loading={isSeasonFetching} onClick={() => handleOnFetchSeasons(selectedSeries!)} />
      <Button disabled={!selectedSeasonId} onClick={handleOnNext}>
        {t("Feature.VideoUpload.SelectSeriesAndSeasonModal.next")}
      </Button>
    </>
  );

  const renderSeriesListFooter = (
    <>
      <AddIcon tooltip={t("Feature.VideoUpload.SelectSeriesAndSeasonModal.addNewSeries")} tooltipPlacement="top" onClick={openNewWindow} />
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
    <Dialog dialogContentSx={{ padding: 0 }} onClose={handleOnClose} headerText={selectedSeries ? selectedSeries.mediaBasicInfo.title : t("Feature.VideoUpload.SelectSeriesAndSeasonModal.headerText")} hideCrossButton open={isVisible} dialogAction={selectedSeries ? renderSeasonListFooter : renderSeriesListFooter}>
      {selectedSeries ? <SeasonListForSelection isLoading={isSeasonFetching} seasons={selectedSeriesSeasons} selectedSeasonId={selectedSeasonId} onSelectedSeason={(id) => setSelectedSeasonId(id)} /> : <SeriesListForSelection seriesList={managerSeries ?? []} onSelectedSeries={handleOnFetchSeasons} isLoading={isManagerSeriesFetching} />}
    </Dialog>
  );
}
