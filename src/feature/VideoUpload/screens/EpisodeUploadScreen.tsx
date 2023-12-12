import { useState } from "react";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import { MovierMediaEnum } from "@/types/enum";
import { extractVideoMetadata } from "metalyzer";
import { useGetUploadVideoSignedUrl } from "../hooks/queryHooks";
import SeriesAndSeasonSelectComponent from "../components/SeriesAndSeasonSelectComponent";
import EpisodeUploadModal from "../components/EpisodeUploadModal";
import SelectSeriesCard from "../components/SelectSeriesCard";

export default function EpisodeUploadScreen() {
  const [isEpisodeUploadModalVisible, setIsEpisodeUploadModalVisible] = useState(true);
  const [isFeetbackSideBarVisible, setIsFeetbackSideBarVisible] = useState(true);
  const { mutateAsync: getUploadEpisodeUrlMutateAsync, isPending } = useGetUploadVideoSignedUrl();

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
  };

  const handleOnToggleEpisodeUploadModal = () => {
    setIsEpisodeUploadModalVisible(!isEpisodeUploadModalVisible);
  };

  const handleOnToggleFeedbackSideBar = () => {
    setIsFeetbackSideBarVisible(!isFeetbackSideBarVisible);
  };

  return (
    <Page>
      <Button onClick={handleOnToggleEpisodeUploadModal}>Upload</Button>
      <SelectSeriesCard />
      {/* <SeriesAndSeasonSelectComponent isVisible={true} /> */}
      <EpisodeUploadModal isVisible={isEpisodeUploadModalVisible} onClose={handleOnToggleEpisodeUploadModal} onVideoDrop={handleOnEpisodeDrop} isLoading={isPending} onFeedback={handleOnToggleFeedbackSideBar} />
      <LayoutAppBar />
      <LayoutAppHeader />
      <LayoutSideBar />
    </Page>
  );
}
