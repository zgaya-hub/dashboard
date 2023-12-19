import { useState } from "react";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import EpisodeUploadModal from "../components/EpisodeComponents/EpisodeUploadModal";
import { useCreateEpisode, useCreateMediaImage, useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks/queryHooks";
import { convertVideoInBlob, extractImageBase64, extractImageMetadata, extractImageUrl, extractVideoMetadata, extractThumbnailsFromVideo } from "metalyzer";
import { MovierMediaEnum } from "@/types/enum";
import { MediaImageTypeEnum } from "../enum";
import SelectSeriesAndSeasonModal from "../components/EpisodeComponents/SelectSeriesAndSeasonModal";
import { BasicInfoFormFieldType } from "../components/EpisodeComponents/EpisodeCreateBasicInfoStep";

export default function EpisodeUploadScreen() {
  const [isEpisodeUploadModalVisible, setIsEpisodeUploadModalVisible] = useState(true);
  const [isFeetbackSideBarVisible, setIsFeetbackSideBarVisible] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [mediaImageId, setMediaImageId] = useState("");
  const [selectedSeasonId, setSelectedSeasonId] = useState("");
  const [isSelectSeriesModalVisible, setIsSelectSeriesModalVisible] = useState<boolean>(true);
  const { mutateAsync: getUploadEpisodeUrlMutateAsync, isPending: isGetUploadEpisodeUrlLoading, data } = useGetUploadVideoSignedUrl();
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

    console.log("");
    const thumbnail = await extractThumbnailsFromVideo(episode);
    console.log(thumbnail, "");

    setThumbnailUrl(thumbnail[0]);
    handleOnUploadOnAwsS3(episode, result.getUploadVideoSignedUrl.SignedUrl);
  };

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
  };

  const handleOnToggleFeedbackSideBar = () => {
    setIsFeetbackSideBarVisible(!isFeetbackSideBarVisible);
  };

  return (
    <Page>
      <Button onClick={handleOnToggleEpisodeUploadModal}>Upload</Button>
      <EpisodeUploadModal uploadEpisodeProgress={60} isVisible={isEpisodeUploadModalVisible} onClose={handleOnToggleEpisodeUploadModal} onEpisodeSelect={handleOnEpisodeDrop} isLoading={isGetUploadEpisodeUrlLoading || isCreateMediaImageLoading || isCreateEpisodeLoading} onFeedback={handleOnToggleFeedbackSideBar} onThumbnailSelect={handleOnThumbnailSelect} onCreateEpisode={handleOnCreateEpisode} thumbnailUrl={thumbnailUrl} />
      {/* <EpisodeCreateBasicInfoModal onThumbnailDrop={handleOnThumbnailDrop} isLoading={isCreateMediaImageLoading || isCreateEpisode} isVisible={isEpisodeCreateBasicInfoModalVisible} onFeedback={handleOnToggleFeedbackSideBar} onCancel={handleOnToggleEpisodeCreateBasicInfoModal} onSave={handleOnCreateEpisode} thumbnailSrc={thumbnailUrl} /> */}
      <SelectSeriesAndSeasonModal onNext={(seasonId) => setSelectedSeasonId(seasonId)} isVisible={isSelectSeriesModalVisible} onClose={handleOnToggleSelectSeriesModalVisible} />
      <LayoutAppBar />
      <LayoutAppHeader />
      <LayoutSideBar />
    </Page>
  );
}
