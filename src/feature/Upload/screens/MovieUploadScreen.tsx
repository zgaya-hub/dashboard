import { useRef, useState } from "react";
import { MovieUploadModal, MovieUploadModalRef, SelectSeriesAndSeasonModal } from "../components";
import {  useCreateMovie, useCreateImage, useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks";
import { extractImageBase64, extractImageMetadata, extractImageUrl, extractThumbnailFromVideo, extractVideoMetadata, convertVideoInBlob } from "metalyzer";
import { ImageVariantEnum, MovierMediaEnum } from "@/types/enum";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { CreateMovieFormFieldType } from "../types";
import { VideoShareModal } from "@/AddtionalFeatures/VideoShare";

export default function MovieUploadScreen() {
  const episodeUploadModalRef = useRef<MovieUploadModalRef>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [selectedSeasonId, setSelectedSeasonId] = useState("");
  const [isSelectSeriesModalVisible, setIsSelectSeriesModalVisible] = useState(true);
  const [isMovieUploadModalVisible, setIsMovieUploadModalVisible] = useState(true);
  const [isVideoShareModalVisible, setIsVideoShareModalVisible] = useState(false);
  const { mutateAsync: getUploadMovieUrlMutateAsync, isPending: isGetUploadMovieUrlLoading, data: getSignedUrlData } = useGetUploadVideoSignedUrl();
  const { mutateAsync: uploadVideoOnAwsS3MutateAsync, progress: episodeUploadProgress } = useUploadVideoOnAwsS3();
  const { mutateAsync: createImageMutateAsync, data: imageData, isPending: isCreateImageLoading } = useCreateImage();
  const { mutateAsync: createMovieMutateAsync, isPending: isCreateMovieLoading, data: createMovieData } = useCreateMovie();

  const handleOnMovieDrop = async (episode: File) => {
    const episodeMetadata = await extractVideoMetadata(episode);
    const result = await getUploadMovieUrlMutateAsync({
      Height: episodeMetadata.videoHeight!,
      Width: episodeMetadata.videoWidth!,
      MediaType: MovierMediaEnum.EPISODE,
      Mime: episodeMetadata.mimeType,
      RunTime: episodeMetadata.videoDuration,
      SizeInKb: episodeMetadata.fileSizeKB,
    });
    episodeUploadModalRef.current?.onNext();
    handleOnThumbnailSelect(await extractThumbnailFromVideo(episode));
    handleOnUploadOnAwsS3(episode, result?.signedUrl!);
  };

  const handleOnCreateMovie = async (input: CreateMovieFormFieldType) => {
    await createMovieMutateAsync({
      Number: input.number,
      ImageId: imageData?.ID,
      SeasonId: selectedSeasonId,
      SignedUrlKeyId: getSignedUrlData?.signedUrlKeyId,
      VideoId: getSignedUrlData?.videoId,
      MediaBasicInfo: {
        PlotSummary: input.plotSummary,
        Title: input.title,
        ReleaseDate: input.releaseDate,
      },
    });
    handleOnToggleVideoShareModalVisible()
    handleOnToggleMovieUploadModal();
  };

  const handleOnThumbnailSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    setThumbnailUrl(await extractImageUrl(image));
    await createImageMutateAsync({ Base64: imageBase64, Mime: mimeType, Variant: ImageVariantEnum.THUMBNAIL });
  };
  
  const handleOnUploadOnAwsS3 = async (episode: File, signedUrl: string) => {
    const videoBlob = await convertVideoInBlob(episode);
    await uploadVideoOnAwsS3MutateAsync({ SignedUrl: signedUrl, VideoBlob: videoBlob });
  };

  const handleOnToggleMovieUploadModal = () => {
    setIsMovieUploadModalVisible(!isMovieUploadModalVisible);
  };

  const handleOnToggleSelectSeriesModalVisible = () => {
    setIsSelectSeriesModalVisible(!isMovieUploadModalVisible);
    handleOnToggleMovieUploadModal();
  };

  const handleOnToggleFeedbackSidebar = () => {
    setIsFeedbackSidebarVisible(!isFeedbackSidebarVisible);
  };

  const handleOnToggleVideoShareModalVisible = () => {
    setIsVideoShareModalVisible(!isVideoShareModalVisible);
  };

  const handleOnNextSelectSeriesAndSeasonModal = (seasonId: string) => {
    setSelectedSeasonId(seasonId);
    setIsSelectSeriesModalVisible(!isMovieUploadModalVisible);
  };

  return (
    <Page>
      <Button onClick={handleOnToggleSelectSeriesModalVisible}>Upload</Button>
      <MovieUploadModal
        isVisible={isMovieUploadModalVisible}
        onClose={handleOnToggleMovieUploadModal}
        onMovieSelect={handleOnMovieDrop}
        isLoading={isCreateImageLoading || isGetUploadMovieUrlLoading || isCreateMovieLoading}
        onFeedback={handleOnToggleFeedbackSidebar}
        onThumbnailSelect={handleOnThumbnailSelect}
        onCreateMovie={handleOnCreateMovie}
        thumbnailUrl={thumbnailUrl}
        ref={episodeUploadModalRef}
        seasonId={selectedSeasonId}
        episodeId={createMovieData?.ID}
        progress={episodeUploadProgress}
      />
      <SelectSeriesAndSeasonModal onNext={handleOnNextSelectSeriesAndSeasonModal} isVisible={isSelectSeriesModalVisible} onClose={handleOnToggleSelectSeriesModalVisible} />
      <VideoShareModal mediaId={createMovieData?.ID} mediaType={MovierMediaEnum.EPISODE} isVisible={isVideoShareModalVisible} onClose={handleOnToggleVideoShareModalVisible} />
    </Page>
  );
}
