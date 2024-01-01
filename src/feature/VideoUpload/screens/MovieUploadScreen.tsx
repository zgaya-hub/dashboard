import { useState } from "react";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { MovierMediaEnum } from "@/types/enum";
import { convertVideoInBlob, extractVideoMetadata } from "metalyzer";
import { useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks";
import MovieUploadModal from "../components/MovieUploadModal";

export default function MovieUploadScreen() {
  const [isMovieUploadModalVisible, setIsMovieUploadModalVisible] = useState(true);
  const [isFeetbackSidebarVisible, setIsFeetbackSidebarVisible] = useState(true);
  const { mutateAsync: getUploadMovieUrlMutateAsync, isPending } = useGetUploadVideoSignedUrl();
  const { mutateAsync: uploadVideoOnAwsS3MutateAsync } = useUploadVideoOnAwsS3();

  const handleOnMovieDrop = async (movie: File) => {
    const movieMetadata = await extractVideoMetadata(movie);
    const result = await getUploadMovieUrlMutateAsync({
      Height: movieMetadata.videoHeight!,
      Width: movieMetadata.videoWidth!,
      Mime: movieMetadata.mimeType,
      RunTime: movieMetadata.videoDuration,
      SizeInKb: movieMetadata.fileSizeKB,
      MediaType: MovierMediaEnum.MOVIE,
    });

    const movieBlob = await convertVideoInBlob(movie);
    if (result) {
      uploadVideoOnAwsS3MutateAsync({ SignedUrl: result?.signedUrl, VideoBlob: movieBlob });
    }
  };

  const handleOnToggleMovieUploadModal = () => {
    setIsMovieUploadModalVisible(!isMovieUploadModalVisible);
  };

  const handleOnToggleFeedbackSidebar = () => {
    setIsFeetbackSidebarVisible(!isFeetbackSidebarVisible);
  };

  return (
    <Page>
      <Button onClick={handleOnToggleMovieUploadModal}>Upload</Button>
      <MovieUploadModal isVisible={isMovieUploadModalVisible} onClose={handleOnToggleMovieUploadModal} onVideoDrop={handleOnMovieDrop} isLoading={isPending} onFeedback={handleOnToggleFeedbackSidebar} />
    </Page>
  );
}
