import { useState } from "react";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import { MovierMediaEnum } from "@/types/enum";
import { convertVideoInBlob, extractVideoMetadata } from "metalyzer";
import { useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks/queryHooks";
import MovieUploadModal from "../components/MovieUploadModal";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";
import { UploadIcon } from "@/components/icons";

export default function MovieUploadScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isMovieUploadModalVisible, setIsMovieUploadModalVisible] = useState(true);
  const [isFeetbackSideBarVisible, setIsFeetbackSideBarVisible] = useState(true);
  const { mutateAsync: getUploadMovieUrlMutateAsync, isPending } = useGetUploadVideoSignedUrl();
  const { mutateAsync: uploadVideoOnAwsS3MutateAsync } = useUploadVideoOnAwsS3();

  const handleOnMovieDrop = async (movie: File) => {
    const movieMetadata = await extractVideoMetadata(movie);
    const result = await getUploadMovieUrlMutateAsync({
      Height: movieMetadata.videoHeight!,
      Width: movieMetadata.videoWidth!,
      MediaType: MovierMediaEnum.MOVIE,
      Mime: movieMetadata.mimeType,
      RunTime: movieMetadata.videoDuration,
      SizeInKb: movieMetadata.fileSizeKB,
    });

    const movieBlob = await convertVideoInBlob(movie);
    uploadVideoOnAwsS3MutateAsync({ SignedUrl: result.getUploadVideoSignedUrl.SignedUrl, VideoBlob: movieBlob });
  };

  const handleOnToggleMovieUploadModal = () => {
    setIsMovieUploadModalVisible(!isMovieUploadModalVisible);
  };

  const handleOnToggleFeedbackSideBar = () => {
    setIsFeetbackSideBarVisible(!isFeetbackSideBarVisible);
  };

  const appHeaderChildren = (
    <Button onClick={() => navigation.navigate("/video-upload/episode")} startIcon={<UploadIcon />}>
      {t("Feature.VideoUpload.MovieUploadScreen.uploadEpisode")}
    </Button>
  );

  return (
    <Page>
      <Button onClick={handleOnToggleMovieUploadModal}>Upload</Button>
      <MovieUploadModal isVisible={isMovieUploadModalVisible} onClose={handleOnToggleMovieUploadModal} onVideoDrop={handleOnMovieDrop} isLoading={isPending} onFeedback={handleOnToggleFeedbackSideBar} />
      <LayoutAppBar />
      <LayoutAppHeader children={appHeaderChildren} />
      <LayoutSideBar />
    </Page>
  );
}
