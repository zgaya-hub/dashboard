import { useRef, useState } from "react";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { useCreateEpisode, useCreateMediaImage, useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks/queryHooks";
import { extractImageBase64, extractImageMetadata, extractImageUrl, extractVideoMetadata, extractThumbnailFromVideo, convertVideoInBlob } from "metalyzer";
import { MediaImageVariantEnum, MovierEnum } from "@/types/enum";
import { CreateEpisodeFormFieldType, EpisodeUploadModal, EpisodeUploadModalRef, SelectSeriesAndSeasonModal } from "../components";

export default function EpisodeUploadScreen() {
  const episodeUploadModalRef = useRef<EpisodeUploadModalRef>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [selectedSeasonId, setSelectedSeasonId] = useState("");
  const [isFeedbackSidebarVisible, setIsFeedbackSidebarVisible] = useState(false);
  const [isSelectSeriesModalVisible, setIsSelectSeriesModalVisible] = useState(true);
  const [isEpisodeUploadModalVisible, setIsEpisodeUploadModalVisible] = useState(true);
  const { mutateAsync: getUploadEpisodeUrlMutateAsync, isPending: isGetUploadEpisodeUrlLoading, data: getUploadSignedUrlData } = useGetUploadVideoSignedUrl();
  const { mutateAsync: uploadVideoOnAwsS3MutateAsync } = useUploadVideoOnAwsS3();
  const { mutateAsync: createImageMutateAsync, data: mediaImageData, isPending: isCreateImageLoading } = useCreateMediaImage();
  const { mutateAsync: createEpisodeMutateAsync, isPending: isCreateEpisodeLoading, data: createEpisodeData } = useCreateEpisode();

  const handleOnEpisodeDrop = async (episode: File) => {
    const episodeMetadata = await extractVideoMetadata(episode);
    const result = await getUploadEpisodeUrlMutateAsync({
      Height: episodeMetadata.videoHeight!,
      Width: episodeMetadata.videoWidth!,
      MediaType: MovierEnum.EPISODE,
      Mime: episodeMetadata.mimeType,
      RunTime: episodeMetadata.videoDuration,
      SizeInKb: episodeMetadata.fileSizeKB,
    });
    episodeUploadModalRef.current?.onNext();
    handleOnThumbnailSelect(await extractThumbnailFromVideo(episode));
    handleOnUploadOnAwsS3(episode, result.getUploadVideoSignedUrl.signedUrl);
  };

  const handleOnCreateEpisode = async (input: CreateEpisodeFormFieldType) => {
    await createEpisodeMutateAsync({
      Number: input.number,
      MediaImageId: mediaImageData?.ID,
      SeasonId: selectedSeasonId,
      SignedUrlKeyId: getUploadSignedUrlData?.getUploadVideoSignedUrl.signedUrlKeyId,
      VideoId: getUploadSignedUrlData?.getUploadVideoSignedUrl.videoId,
      MediaBasicInfo: {
        PlotSummary: input.plotSummary,
        Title: input.title,
        ReleaseDate: input.releaseDate,
      },
    });
    episodeUploadModalRef.current?.onNext();
  };

  const handleOnThumbnailSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    setThumbnailUrl(await extractImageUrl(image));
    await createImageMutateAsync({ Base64: imageBase64, Mime: mimeType, Variant: MediaImageVariantEnum.THUMBNAIL });
  };

  const handleOnUploadOnAwsS3 = async (episode: File, signedUrl: string) => {
    const episodeBlob = await convertVideoInBlob(episode);
    await uploadVideoOnAwsS3MutateAsync({ SignedUrl: signedUrl, VideoBlob: episodeBlob });
  };

  const handleOnToggleEpisodeUploadModal = () => {
    setIsEpisodeUploadModalVisible(!isEpisodeUploadModalVisible);
  };

  const handleOnToggleSelectSeriesModalVisible = () => {
    setIsSelectSeriesModalVisible(!isEpisodeUploadModalVisible);
    handleOnToggleEpisodeUploadModal();
  };

  const handleOnToggleFeedbackSidebar = () => {
    setIsFeedbackSidebarVisible(!isFeedbackSidebarVisible);
  };

  const handleOnNextSelectSeriesAndSeasonModal = (seasonId: string) => {
    setSelectedSeasonId(seasonId);
    setIsSelectSeriesModalVisible(!isEpisodeUploadModalVisible);
  };

  return (
    <Page>
      <Button onClick={handleOnToggleSelectSeriesModalVisible}>Upload</Button>
      <EpisodeUploadModal
        isVisible={isEpisodeUploadModalVisible}
        onClose={handleOnToggleEpisodeUploadModal}
        onEpisodeSelect={handleOnEpisodeDrop}
        isLoading={isCreateImageLoading || isGetUploadEpisodeUrlLoading || isCreateEpisodeLoading}
        onFeedback={handleOnToggleFeedbackSidebar}
        onThumbnailSelect={handleOnThumbnailSelect}
        onCreateEpisode={handleOnCreateEpisode}
        thumbnailUrl={thumbnailUrl}
        ref={episodeUploadModalRef}
        isVideoUploaded={!!getUploadSignedUrlData}
        isEpisodeCreated={!!createEpisodeData}
        seasonId={selectedSeasonId}
      />
      <SelectSeriesAndSeasonModal onNext={handleOnNextSelectSeriesAndSeasonModal} isVisible={isSelectSeriesModalVisible} onClose={handleOnToggleSelectSeriesModalVisible} />
    </Page>
  );
}
