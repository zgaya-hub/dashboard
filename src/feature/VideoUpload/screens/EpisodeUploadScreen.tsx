import { useState } from "react";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import EpisodeUploadModal from "../components/EpisodeComponents/EpisodeUploadModal";
import { useCreateEpisode, useCreateMediaImage, useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks/queryHooks";
import { convertVideoInBlob, extractImageBase64, extractImageMetadata, extractImageUrl, extractVideoMetadata } from "metalyzer";
import { MovierMediaEnum } from "@/types/enum";
import EpisodeCreateBasicInfoModal, { BasicInfoFormFieldType } from "../components/EpisodeComponents/EpisodeCreateBasicInfoModal";
import { MediaImageTypeEnum } from "../enum";

export default function EpisodeUploadScreen() {
  const [isEpisodeUploadModalVisible, setIsEpisodeUploadModalVisible] = useState(true);
  const [isEpisodeCreateBasicInfoModalVisible, setIsEpisodeCreateBasicInfoModalVisible] = useState(false);
  const [isFeetbackSideBarVisible, setIsFeetbackSideBarVisible] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [mediaImageId, setMediaImageId] = useState("");
  const [selectedSeasonId, setSelectedSeasonId] = useState("");
  const { mutateAsync: getUploadEpisodeUrlMutateAsync, isPending, data } = useGetUploadVideoSignedUrl();
  const { mutateAsync: uploadVideoOnAwsS3MutateAsync } = useUploadVideoOnAwsS3();
  const { mutateAsync: createMediaImageMutateAsync, isPending: isCreateMediaImageLoading } = useCreateMediaImage();
  const { mutateAsync: createEpisodeMutateAsync, isPending: isCreateEpisode } = useCreateEpisode();

  const handleOnEpisodeDrop = async (episode: File) => {
    const episodeMetadata = await extractVideoMetadata(episode);
    const result = await getUploadEpisodeUrlMutateAsync({
      Height: episodeMetadata.videoHeight!,
      Width: episodeMetadata.videoWidth!,
      MediaType: MovierMediaEnum.EPISODE,
      Mime: episodeMetadata.mimeType,
      RunTime: episodeMetadata.videoDuration,
      SizeInKb: episodeMetadata.fileSizeKB,
    });

    handleOnUploadOnAwsS3(episode, result.getUploadVideoSignedUrl.SignedUrl);
  };

  console.log(data?.getUploadVideoSignedUrl.SignedUrlKeyId);

  const handleOnCreateEpisode = (input: BasicInfoFormFieldType) => {
    createEpisodeMutateAsync({
      EpisodeNo: input.episodeNo,
      MediaImageId: mediaImageId,
      SeasonId: selectedSeasonId,
      SignedUrlKeyId: data?.getUploadVideoSignedUrl.SignedUrlKeyId!,
      VideoId: data?.getUploadVideoSignedUrl.VideoId!,
      MediaBasicInfo: {
        PlotSummary: input.plotSummary,
        Title: input.title,
        ReleaseDate: input.releaseDate,
      },
    });
  };

  const handleOnThumbnailDrop = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    setThumbnailUrl(await extractImageUrl(image));
    const result = await createMediaImageMutateAsync({ MediaImageBase64: imageBase64, MediaImageMime: mimeType, MediaImageType: MediaImageTypeEnum.THUMBNAIL });
    setMediaImageId(result.createMediaImage.mediaImageId);
    console.log(result);
  };

  const handleOnUploadOnAwsS3 = async (episode: File, signedUrl: string) => {
    const episodeBlob = await convertVideoInBlob(episode);
    await uploadVideoOnAwsS3MutateAsync({ SignedUrl: signedUrl, VideoBlob: episodeBlob });
    handleOnToggleEpisodeUploadModal();
    handleOnToggleEpisodeCreateBasicInfoModal();
  };

  const handleOnToggleEpisodeUploadModal = () => {
    setIsEpisodeUploadModalVisible(!isEpisodeUploadModalVisible);
  };

  const handleOnToggleEpisodeCreateBasicInfoModal = () => {
    setIsEpisodeCreateBasicInfoModalVisible(!isEpisodeCreateBasicInfoModalVisible);
  };

  const handleOnToggleFeedbackSideBar = () => {
    setIsFeetbackSideBarVisible(!isFeetbackSideBarVisible);
  };

  return (
    <Page>
      <Button onClick={handleOnToggleEpisodeUploadModal}>Upload</Button>
      <EpisodeUploadModal isVisible={isEpisodeUploadModalVisible} onClose={handleOnToggleEpisodeUploadModal} onVideoDrop={handleOnEpisodeDrop} isLoading={isPending} onFeedback={handleOnToggleFeedbackSideBar} onSelectSeasonId={(seasonId) => setSelectedSeasonId(seasonId)} />
      <EpisodeCreateBasicInfoModal onThumbnailDrop={handleOnThumbnailDrop} isLoading={isCreateMediaImageLoading || isCreateEpisode} isVisible={isEpisodeCreateBasicInfoModalVisible} onFeedback={handleOnToggleFeedbackSideBar} onCancel={handleOnToggleEpisodeCreateBasicInfoModal} onSave={handleOnCreateEpisode} thumbnailSrc={thumbnailUrl} />
      <LayoutAppBar />
      <LayoutAppHeader />
      <LayoutSideBar />
    </Page>
  );
}
