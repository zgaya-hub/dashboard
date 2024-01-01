import { useState } from "react";
import Page from "@/components/Page";
import { MovierMediaEnum } from "@/types/enum";
import { convertVideoInBlob, extractVideoMetadata } from "metalyzer";
import { useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks";
import Button from "@/components/Button";
import TrailerUploadModal from "../components/TrailerUploadModal";

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
      MediaType: MovierMediaEnum.TRAILER,
    });

    const movieBlob = await convertVideoInBlob(trailer);
    uploadVideoOnAwsS3MutateAsync({ SignedUrl: result.getUploadVideoSignedUrl.signedUrl, VideoBlob: movieBlob });
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
