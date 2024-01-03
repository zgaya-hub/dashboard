import { useState } from "react";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { MovierMediaEnum } from "@/types/enum";
import { convertVideoInBlob, extractImageBase64, extractImageMetadata, extractImageUrl, extractVideoMetadata } from "metalyzer";
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

    handleOnUploadOnAwsS3(movie, result?.signedUrl);
  };

  const handleOnUploadOnAwsS3 = async (episode: File, signedUrl: string) => {
    const videoBlob = await convertVideoInBlob(episode);
    await uploadVideoOnAwsS3MutateAsync({ SignedUrl: signedUrl, VideoBlob: videoBlob });
  };

  const handleOnThumbnailSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    setThumbnailUrl(await extractImageUrl(image));
    await createImageMutateAsync({ Base64: imageBase64, Mime: mimeType, Variant: ImageVariantEnum.THUMBNAIL });
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
