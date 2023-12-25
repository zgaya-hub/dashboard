import { useState } from "react";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { useCreateEpisode, useCreateMediaImage, useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks/queryHooks";
import { convertVideoInBlob, extractImageBase64, extractImageMetadata, extractImageUrl, extractVideoMetadata, extractThumbnailFromVideo } from "metalyzer";
import { MediaImageTypeEnum, MovierMediaEnum } from "@/types/enum";
import { CreateEpisodeFormFieldType } from "../components/EpisodeComponents/EpisodeCreateStep";
import EpisodeUploadModal from "../components/EpisodeComponents/EpisodeUploadModal";
import SelectSeriesAndSeasonModal from "../components/EpisodeComponents/SelectSeriesAndSeasonModal";
import ConfirmationModal from "@/components/Modals/ConfirmationModal";
import { useTranslation } from "react-i18next";

export default function EpisodeUploadScreen() {
  const { t } = useTranslation();
  const [isEpisodeUploadModalVisible, setIsEpisodeUploadModalVisible] = useState(true);
  const [isFeetbackSideBarVisible, setIsFeetbackSideBarVisible] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [mediaImageId, setMediaImageId] = useState("");
  const [selectedSeasonId, setSelectedSeasonId] = useState("");
  const [episode, setEpisode] = useState<File | null>(null);
  const [thumbnailExtractConfirmationModalVisible, setThumbnailExtractConfirmationModalVisible] = useState(false);
  const [isSelectSeriesModalVisible, setIsSelectSeriesModalVisible] = useState<boolean>(true);
  const { mutateAsync: getUploadEpisodeUrlMutateAsync, isPending: isGetUploadEpisodeUrlLoading, data: getUploadSignedUrlData } = useGetUploadVideoSignedUrl();
  const { mutateAsync: uploadVideoOnAwsS3MutateAsync } = useUploadVideoOnAwsS3();
  const { mutateAsync: createMediaImageMutateAsync, isPending: isCreateMediaImageLoading } = useCreateMediaImage();
  const { mutateAsync: createEpisodeMutateAsync, isPending: isCreateEpisodeLoading } = useCreateEpisode();

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
    setEpisode(episode);
    handleonToggleThumbnailExtractConfirmationModalVisible();
    handleOnUploadOnAwsS3(episode, result.getUploadVideoSignedUrl.SignedUrl);
  };

  const handleOnConfirmExtractThumbnail = async () => {
    const thumbnail = await extractThumbnailFromVideo(episode);
    handleOnThumbnailSelect(thumbnail);
  };

  const handleOnCreateEpisode = (input: CreateEpisodeFormFieldType) => {
    createEpisodeMutateAsync({
      EpisodeNo: input.episodeNo,
      MediaImageId: mediaImageId,
      SeasonId: selectedSeasonId,
      SignedUrlKeyId: getUploadSignedUrlData?.getUploadVideoSignedUrl.SignedUrlKeyId,
      VideoId: getUploadSignedUrlData?.getUploadVideoSignedUrl.VideoId,
      MediaBasicInfo: {
        PlotSummary: input.plotSummary,
        Title: input.title,
        ReleaseDate: input.releaseDate,
      },
    });
  };

  const handleOnThumbnailSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    setThumbnailUrl(await extractImageUrl(image));
    const result = await createMediaImageMutateAsync({ MediaImageBase64: imageBase64, MediaImageMime: mimeType, MediaImageType: MediaImageTypeEnum.THUMBNAIL });
    setMediaImageId(result.createMediaImage.mediaImageId);
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

  const handleOnToggleFeedbackSideBar = () => {
    setIsFeetbackSideBarVisible(!isFeetbackSideBarVisible);
  };

  const handleOnNextSelectSeriesAndSeasonModal = (seasonId: string) => {
    setSelectedSeasonId(seasonId);
    setIsSelectSeriesModalVisible(!isEpisodeUploadModalVisible);
  };

  const handleonToggleThumbnailExtractConfirmationModalVisible = () => {
    setThumbnailExtractConfirmationModalVisible(!thumbnailExtractConfirmationModalVisible);
  };

  return (
    <Page>
      <Button onClick={handleOnToggleSelectSeriesModalVisible}>Upload</Button>
      <EpisodeUploadModal uploadEpisodeProgress={60} isVisible={isEpisodeUploadModalVisible} onClose={handleOnToggleEpisodeUploadModal} onEpisodeSelect={handleOnEpisodeDrop} isLoading={isGetUploadEpisodeUrlLoading || isCreateMediaImageLoading || isCreateEpisodeLoading} onFeedback={handleOnToggleFeedbackSideBar} onThumbnailSelect={handleOnThumbnailSelect} onCreateEpisode={handleOnCreateEpisode} thumbnailUrl={thumbnailUrl} />
      <SelectSeriesAndSeasonModal onNext={handleOnNextSelectSeriesAndSeasonModal} isVisible={isSelectSeriesModalVisible} onClose={handleOnToggleSelectSeriesModalVisible} />
      <ConfirmationModal isOpen={thumbnailExtractConfirmationModalVisible} onClose={handleonToggleThumbnailExtractConfirmationModalVisible} onConfirm={handleOnConfirmExtractThumbnail} title={t("Feature.VideoUpload.EpisodeUploadScreen.confirmationModalTitle")}>
        {t("Feature.VideoUpload.EpisodeUploadScreen.confirmationModalMessage")}
      </ConfirmationModal>
    </Page>
  );
}
