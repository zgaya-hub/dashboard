import { useState } from "react";
import { AuthScreenPage } from "@/components/Page";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import { MovierMediaEnum } from "@/types/enum";
import { extractVideoMetadata, extractVideoUrl } from "metalyzer";
import { useGetUploadVideoSignedUrl } from "../hooks/queryHooks";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";
import VideoUploadModal from "../components/VideoUploadModal";

export default function TrailerUploadScreen() {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const [isTrailerUploadModalVisible, setIsTrailerUploadModalVisible] = useState(true);
  const [isFeetbackSideBarVisible, setIsFeetbackSideBarVisible] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const { mutateAsync: getUploadTrailerUrlMutateAsync, isPending } = useGetUploadVideoSignedUrl();

  const handleOnTrailerDrop = async (trailer: File) => {
    const trailerMetadata = await extractVideoMetadata(trailer);
    const result = await getUploadTrailerUrlMutateAsync({
      Height: trailerMetadata.videoHeight!,
      Width: trailerMetadata.videoWidth!,
      MediaType: MovierMediaEnum.TRAILER,
      Mime: trailerMetadata.mimeType,
      RunTime: trailerMetadata.videoDuration,
      SizeInKb: trailerMetadata.fileSizeKB,
    });

    setTrailerUrl(await extractVideoUrl(trailer));
    handleOnToggleTrailerUploadModal();
  };

  const handleOnToggleTrailerUploadModal = () => {
    setIsTrailerUploadModalVisible(!isTrailerUploadModalVisible);
  };


  const handleOnToggleFeedbackSideBar = () => {
    setIsFeetbackSideBarVisible(!isFeetbackSideBarVisible);
  };

  const handleOnLeftClick = () => {
    navigate.navigate("/video-upload/episode");
  };

  const handleOnRightClick = () => {
    navigate.navigate("/video-upload/movie");
  };

  return (
    <AuthScreenPage>
        <Button onClick={handleOnToggleTrailerUploadModal}>Upload</Button>
      {trailerUrl && (
        <video controls width="100%" height="600">
          <source src={trailerUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <VideoUploadModal isVisible={isTrailerUploadModalVisible} onClose={handleOnToggleTrailerUploadModal} onVideoDrop={handleOnTrailerDrop} isLoading={isPending} onFeedback={handleOnToggleFeedbackSideBar} headerText={t("Feature.VideoUpload.TrailerUploadModal.headerText")} title={t("Feature.VideoUpload.TrailerUploadModal.title")} message={t("Feature.VideoUpload.TrailerUploadModal.message")} onLeftIconClick={handleOnLeftClick} onRightIconClick={handleOnRightClick} leftTooltip={"Upload episode"} rightTooltip={"Upload movie"} />
      <LayoutAppBar />
      <LayoutAppHeader />
      <LayoutSideBar />
    </AuthScreenPage>
  );
}
