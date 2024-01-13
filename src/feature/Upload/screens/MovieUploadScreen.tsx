import { lazy, Suspense, useState } from "react";
import { lazily } from "react-lazily";
import { MirraScopeMediaEnum } from "zgaya.hub-client-types/lib";

const { VideoShareModal } = lazily(() => import("@/AddtionalFeatures/VideoShare"));
const Button = lazy(() => import("@/components/Button"));
const Page = lazy(() => import("@/components/Page"));
const { MovieUploadModal } = lazily(() => import("../components"));

export default function MovieUploadScreen() {
  const [isMovieUploadModalVisible, setIsMovieUploadModalVisible] = useState(false);
  const [isVideoShareModalVisible, setIsVideoShareModalVisible] = useState(false);

  const handleOnToggleMovieUploadModal = () => {
    setIsMovieUploadModalVisible(!isMovieUploadModalVisible);
  };

  const handleOnToggleSelectSeriesModal = () => {
    handleOnToggleMovieUploadModal();
  };

  const handleOnToggleVideoShareModal = () => {
    setIsVideoShareModalVisible(!isVideoShareModalVisible);
  };

  return (
    <Suspense>
      <Page>
        <Button onClick={handleOnToggleSelectSeriesModal}>Upload</Button>
        <MovieUploadModal isVisible={isMovieUploadModalVisible} onClose={handleOnToggleMovieUploadModal} onOpenShareModal={handleOnToggleVideoShareModal} />
        <VideoShareModal mediaId={""} mediaType={MirraScopeMediaEnum.EPISODE} isVisible={isVideoShareModalVisible} onClose={handleOnToggleVideoShareModal} />
      </Page>
    </Suspense>
  );
}
