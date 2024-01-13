import { Suspense, lazy, useState } from "react";
import { lazily } from "react-lazily";
import { MirraScopeMediaEnum } from "zgaya.hub-client-types/lib";

const { VideoShareModal } = lazily(() => import("@/AddtionalFeatures/VideoShare"));
const Button = lazy(() => import("@/components/Button"));
const Page = lazy(() => import("@/components/Page"));
const { EpisodeUploadModal, SelectSeriesAndSeasonModal } = lazily(() => import("../components"));

export default function EpisodeUploadScreen() {
  const [selectedSeasonId, setSelectedSeasonId] = useState("");
  const [isSelectSeriesModalVisible, setIsSelectSeriesModalVisible] = useState(true);
  const [isEpisodeUploadModalVisible, setIsEpisodeUploadModalVisible] = useState(true);
  const [isVideoShareModalVisible, setIsVideoShareModalVisible] = useState(false);

  const handleOnToggleEpisodeUploadModal = () => {
    setIsEpisodeUploadModalVisible(!isEpisodeUploadModalVisible);
  };

  const handleOnToggleSelectSeriesModal = () => {
    setIsSelectSeriesModalVisible(!isEpisodeUploadModalVisible);
    handleOnToggleEpisodeUploadModal();
  };

  const handleOnToggleVideoShareModal = () => {
    setIsVideoShareModalVisible(!isVideoShareModalVisible);
  };

  const handleOnNextSelectSeriesAndSeasonModal = (seasonId: string) => {
    setSelectedSeasonId(seasonId);
    setIsSelectSeriesModalVisible(!isEpisodeUploadModalVisible);
  };

  return (
    <Suspense>
      <Page>
        <Button onClick={handleOnToggleSelectSeriesModal}>Upload</Button>
        <EpisodeUploadModal isVisible={isEpisodeUploadModalVisible} onClose={handleOnToggleEpisodeUploadModal} seasonId={selectedSeasonId} onOpenShareModal={handleOnToggleVideoShareModal} />
        <SelectSeriesAndSeasonModal onNext={handleOnNextSelectSeriesAndSeasonModal} isVisible={isSelectSeriesModalVisible} onClose={handleOnToggleSelectSeriesModal} />
        <VideoShareModal mediaId={""} mediaType={MirraScopeMediaEnum.EPISODE} isVisible={isVideoShareModalVisible} onClose={handleOnToggleVideoShareModal} />
      </Page>
    </Suspense>
  );
}
