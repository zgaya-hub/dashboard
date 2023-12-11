import { useState } from "react";
import Button from "@/components/Button";
import { AuthScreenPage } from "@/components/Page";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import { MovierMediaEnum } from "@/types/enum";
import { extractVideoMetadata, extractVideoUrl } from "metalyzer";
import { useGetUploadVideoSignedUrl } from "../hooks/queryHooks";
import EpisodeUploadModal from "../components/VideoUploadModal";
import SeriesAndSeasonSelectComponent from "../components/SeriesAndSeasonSelectComponent";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";

export default function EpisodeUploadScreen() {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const [isEpisodeUploadModalVisible, setIsEpisodeUploadModalVisible] = useState(true);
  const [isFeetbackSideBarVisible, setIsFeetbackSideBarVisible] = useState(true);
  const [episodeUrl, setEpisodeUrl] = useState<string | null>(null);
  const { mutateAsync: getUploadEpisodeUrlMutateAsync, isPending } = useGetUploadVideoSignedUrl();

  const handleOnEpisodeDrop = async (episode: File) => {
    const episodeMetadata = await extractVideoMetadata(episode);
    setEpisodeUrl(await extractVideoUrl(episode));
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


  const handleOnLeftClick = () => {
    navigate.navigate("/video-upload/movie");
  };

  const handleOnRightClick = () => {
    navigate.navigate("/video-upload/trailer");
  };


  return (
    <AuthScreenPage>
      <Button onClick={handleOnToggleEpisodeUploadModal}>Upload</Button>
      {episodeUrl && (
        <video controls width="100%" height="600">
          <source src={episodeUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <SeriesAndSeasonSelectComponent isVisible={true} />
      <EpisodeUploadModal isVisible={isEpisodeUploadModalVisible} onClose={handleOnToggleEpisodeUploadModal} onVideoDrop={handleOnEpisodeDrop} isLoading={isPending} onFeedback={handleOnToggleFeedbackSideBar} headerText={t("Feature.VideoUpload.EpisodeUploadModal.headerText")} title={t("Feature.VideoUpload.EpisodeUploadModal.title")} message={t("Feature.VideoUpload.EpisodeUploadModal.message")} onLeftIconClick={handleOnLeftClick} onRightIconClick={handleOnRightClick} leftTooltip={"Upload movie"} rightTooltip={"Upload trailer"} />
      <LayoutAppBar />
      <LayoutAppHeader />
      <LayoutSideBar />
    </AuthScreenPage>
  );
}
