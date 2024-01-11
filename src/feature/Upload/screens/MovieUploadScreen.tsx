import { useRef, useState } from "react";
import { MovieUploadModal, MovieUploadModalRef } from "../components";
import { useCreateImage, useCreateMovie, useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks";
import { extractImageBase64, extractImageMetadata, extractImageUrl, extractThumbnailFromVideo, extractVideoMetadata, convertVideoInBlob } from "metalyzer";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { CreateMovieFormFieldType } from "../types";
import { VideoShareModal } from "@/AddtionalFeatures/VideoShare";
import { ImageVariantEnum, MirraScopeMediaEnum } from "mirra-scope-client-types/lib";
import { useSidebarContext } from "@/context/SidebarContext";

export default function MovieUploadScreen() {
  const episodeUploadModalRef = useRef<MovieUploadModalRef>(null);
  const { handleOnToggleFeedbackSidebar } = useSidebarContext();
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
      MediaType: MirraScopeMediaEnum.EPISODE,
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
      ImageId: input.imageId,
      SignedUrlKeyId: getSignedUrlData?.signedUrlKeyId,
      VideoId: getSignedUrlData?.videoId,
      PlotSummary: input.plotSummary,
      Title: input.title,
      ReleaseDate: input.releaseDate,
      AdditionalInfo: {
        Genre: input.genre,
        OriginalLanguage: input.originalLanguage,
        OriginCountry: input.originCountry,
        Status: input.status,
      },
    });
    handleOnToggleVideoShareModal();
    handleOnToggleMovieUploadModal();
  };

  const handleOnThumbnailSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    await createImageMutateAsync({ Base64: imageBase64, Mime: mimeType, Variant: ImageVariantEnum.THUMBNAIL });
  };

  const handleOnUploadOnAwsS3 = async (episode: File, signedUrl: string) => {
    const videoBlob = await convertVideoInBlob(episode);
    await uploadVideoOnAwsS3MutateAsync({ SignedUrl: signedUrl, VideoBlob: videoBlob });
  };

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
    <Page>
      <Button onClick={handleOnToggleSelectSeriesModal}>Upload</Button>
      <MovieUploadModal
        isVisible={isMovieUploadModalVisible}
        onClose={handleOnToggleMovieUploadModal}
        onMovieSelect={handleOnMovieDrop}
        isLoading={isCreateImageLoading || isGetUploadMovieUrlLoading || isCreateMovieLoading}
        onFeedback={handleOnToggleFeedbackSidebar}
        onThumbnailSelect={handleOnThumbnailSelect}
        onCreateMovie={handleOnCreateMovie}
        ref={episodeUploadModalRef}
        progress={episodeUploadProgress}
      />
      <VideoShareModal mediaId={createMovieData?.ID} mediaType={MirraScopeMediaEnum.EPISODE} isVisible={isVideoShareModalVisible} onClose={handleOnToggleVideoShareModal} />
    </Page>
  );
}
