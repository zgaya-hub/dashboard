import { useState } from "react";
import Page from "@/components/Page";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import { MovierMediaEnum } from "@/types/enum";
import { convertVideoInBlob, extractVideoMetadata } from "metalyzer";
import { useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks/queryHooks";
import Button from "@/components/Button";
import TrailerUploadModal from "../components/TrailerUploadModal";
import { UploadIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";

export default function TrailerUploadScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isTrailerUploadModalVisible, setIsTrailerUploadModalVisible] = useState(true);
  const [isFeetbackSideBarVisible, setIsFeetbackSideBarVisible] = useState(true);
  const { mutateAsync: getUploadTrailerUrlMutateAsync, isPending } = useGetUploadVideoSignedUrl();
  const { mutateAsync: uploadVideoOnAwsS3MutateAsync } = useUploadVideoOnAwsS3();

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

    const movieBlob = await convertVideoInBlob(trailer);
    uploadVideoOnAwsS3MutateAsync({ SignedUrl: result.getUploadVideoSignedUrl.SignedUrl, VideoBlob: movieBlob });
    handleOnToggleTrailerUploadModal();
  };

  const handleOnToggleTrailerUploadModal = () => {
    setIsTrailerUploadModalVisible(!isTrailerUploadModalVisible);
  };

  const handleOnToggleFeedbackSideBar = () => {
    setIsFeetbackSideBarVisible(!isFeetbackSideBarVisible);
  };

  const appHeaderChildren = (
    <Button onClick={() => navigation.navigate("/video-upload/movie")} startIcon={<UploadIcon />}>
      {t("Feature.VideoUpload.TrailerUploadScreen.uploadMovie")}
    </Button>
  );

  return (
    <Page>
      <Button onClick={handleOnToggleTrailerUploadModal}>Upload</Button>
      <TrailerUploadModal isVisible={isTrailerUploadModalVisible} onClose={handleOnToggleTrailerUploadModal} onVideoDrop={handleOnTrailerDrop} isLoading={isPending} onFeedback={handleOnToggleFeedbackSideBar} />
      <LayoutAppBar />
      <LayoutAppHeader children={appHeaderChildren} />
      <LayoutSideBar />
    </Page>
  );
}
