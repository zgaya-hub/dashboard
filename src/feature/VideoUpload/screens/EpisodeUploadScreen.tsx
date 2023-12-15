import { useState } from "react";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import EpisodeUploadModal from "../components/EpisodeComponents/EpisodeUploadModal";
import { useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks/queryHooks";
import { convertVideoInBlob, extractVideoMetadata } from "metalyzer";
import { MovierMediaEnum } from "@/types/enum";
import EpisodeCreateBasicInfoModal from "../components/EpisodeComponents/EpisodeCreateBasicInfoModal";

export default function EpisodeUploadScreen() {
  const [isEpisodeUploadModalVisible, setIsEpisodeUploadModalVisible] = useState(true);
  const [isEpisodeCreateBasicInfoModalVisible, setIsEpisodeCreateBasicInfoModalVisible] = useState(false);
  const [isFeetbackSideBarVisible, setIsFeetbackSideBarVisible] = useState(true);
  const { mutateAsync: getUploadEpisodeUrlMutateAsync, isPending } = useGetUploadVideoSignedUrl();
  const { mutateAsync: uploadVideoOnAwsS3MutateAsync } = useUploadVideoOnAwsS3();

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
  

  const handleOnUploadOnAwsS3 = async (episode: File, signedUrl: string) => {
    const episodeBlob = await convertVideoInBlob(episode);
    await uploadVideoOnAwsS3MutateAsync({ SignedUrl: signedUrl, VideoBlob: episodeBlob });
    handleOnToggleEpisodeUploadModal()
    handleOnToggleEpisodeCreateBasicInfoModal()
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
      <EpisodeUploadModal isVisible={isEpisodeUploadModalVisible} onClose={handleOnToggleEpisodeUploadModal} onVideoDrop={handleOnEpisodeDrop} isLoading={isPending} onFeedback={handleOnToggleFeedbackSideBar} />
      <EpisodeCreateBasicInfoModal isVisible={isEpisodeCreateBasicInfoModalVisible}  onFeedback={handleOnToggleFeedbackSideBar} onCancel={handleOnToggleEpisodeCreateBasicInfoModal} />
      <LayoutAppBar />
      <LayoutAppHeader />
      <LayoutSideBar />
    </Page>
  );
}
