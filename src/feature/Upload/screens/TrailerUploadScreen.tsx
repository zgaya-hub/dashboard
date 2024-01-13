import { useState } from "react";
import { convertVideoInBlob, extractVideoMetadata } from "metalyzer";
import { MirraScopeMediaEnum } from "zgaya.hub-client-types/lib";

import Button from "@/components/Button";
import Page from "@/components/Page";

import TrailerUploadModal from "../components/TrailerUploadModal";
import { useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks";

export default function TrailerUploadScreen() {
  const [isTrailerUploadModalVisible, setIsTrailerUploadModalVisible] = useState(true);
  const [isFeetbackSidebarVisible, setIsFeetbackSidebarVisible] = useState(true);
  const { mutateAsync: getUploadTrailerUrlMutateAsync, isPending } = useGetUploadVideoSignedUrl();
  const { mutateAsync: uploadVideoOnAwsS3MutateAsync } = useUploadVideoOnAwsS3();

  const handleOnTrailerDrop = async (trailer: File) => {
    const trailerMetadata = await extractVideoMetadata(trailer);
    const result = await getUploadTrailerUrlMutateAsync({
      Height: trailerMetadata.videoHeight!,
      Width: trailerMetadata.videoWidth!,
      Mime: trailerMetadata.mimeType,
      RunTime: trailerMetadata.videoDuration,
      SizeInKb: trailerMetadata.fileSizeKB,
      MediaType: MirraScopeMediaEnum.TRAILER,
    });

    const movieBlob = await convertVideoInBlob(trailer);
    if (result) {
      uploadVideoOnAwsS3MutateAsync({ SignedUrl: result?.signedUrl, VideoBlob: movieBlob });
    }
    handleOnToggleTrailerUploadModal();
  };

  const handleOnToggleTrailerUploadModal = () => {
    setIsTrailerUploadModalVisible(!isTrailerUploadModalVisible);
  };

  const handleOnToggleFeedbackSidebar = () => {
    setIsFeetbackSidebarVisible(!isFeetbackSidebarVisible);
  };

  return (
    <Page>
      <Button onClick={handleOnToggleTrailerUploadModal}>Upload</Button>
      <TrailerUploadModal isVisible={isTrailerUploadModalVisible} onClose={handleOnToggleTrailerUploadModal} onVideoDrop={handleOnTrailerDrop} isLoading={isPending} onFeedback={handleOnToggleFeedbackSidebar} />
    </Page>
  );
}
