import { useState } from "react";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import { MovierMediaEnum } from "@/types/enum";
import { convertVideoInBlob, extractVideoMetadata } from "metalyzer";
import { useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks/queryHooks";
import MovieUploadModal from "../components/MovieUploadModal";

export default function MovieUploadScreen() {
  const [isMovieUploadModalVisible, setIsMovieUploadModalVisible] = useState(true);
  const [isFeetbackSideBarVisible, setIsFeetbackSideBarVisible] = useState(true);
  const { mutateAsync: getUploadMovieUrlMutateAsync, isPending } = useGetUploadVideoSignedUrl();
  const { mutateAsync: uploadVideoOnAwsS3MutateAsync } = useUploadVideoOnAwsS3();

  const handleOnMovieDrop = async (movie: File) => {
    const movieMetadata = await extractVideoMetadata(movie);
    const result = await getUploadMovieUrlMutateAsync({
      Height: movieMetadata.videoHeight!,
      Width: movieMetadata.videoWidth!,
      MediaType: MovierMediaEnum.MOVIE,
      Mime: movieMetadata.mimeType,
      RunTime: movieMetadata.videoDuration,
      SizeInKb: movieMetadata.fileSizeKB,
    });

    const movieBlob = await convertVideoInBlob(movie)
    uploadVideoOnAwsS3MutateAsync({ SignedUrl: result.getUploadVideoSignedUrl.SignedUrl, VideoBlob: movieBlob });
  };

  const handleOnToggleMovieUploadModal = () => {
    setIsMovieUploadModalVisible(!isMovieUploadModalVisible);
  };

  const handleOnToggleFeedbackSideBar = () => {
    setIsFeetbackSideBarVisible(!isFeetbackSideBarVisible);
  };

  return (
    <Page>
      <Button onClick={handleOnToggleMovieUploadModal}>Upload</Button>
        <MovieUploadModal
        isVisible={isMovieUploadModalVisible}
        onClose={handleOnToggleMovieUploadModal}
        onVideoDrop={handleOnMovieDrop}
        isLoading={isPending}
        onFeedback={handleOnToggleFeedbackSideBar}
      />
      <LayoutAppBar />
      <LayoutAppHeader />
      <LayoutSideBar />
    </Page>
  );
}
