import { useState } from "react";
import Button from "@/components/Button";
import { AuthScreenPage } from "@/components/Page";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import { MovierMediaEnum } from "@/types/enum";
import { extractVideoMetadata, extractVideoUrl } from "metalyzer";
import { useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks/queryHooks";
import VideoUploadModal from "../components/VideoUploadModal";
import useNavigation from "@/navigation/use-navigation";
import { useTranslation } from "react-i18next";

export default function MovieUploadScreen() {
  const { t } = useTranslation();
  const navigate = useNavigation();

  const [isMovieUploadModalVisible, setIsMovieUploadModalVisible] = useState(true);
  const [isFeetbackSideBarVisible, setIsFeetbackSideBarVisible] = useState(true);
  const [movieUrl, setMovieUrl] = useState<string | null>(null);
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

    console.log(result);

    uploadVideoOnAwsS3MutateAsync({SignedUrl: result.getUploadVideoSignedUrl.SignedUrl, VideoBlob})

    setMovieUrl(await extractVideoUrl(movie));
    handleOnToggleMovieUploadModal();
  };

  const handleOnToggleMovieUploadModal = () => {
    setIsMovieUploadModalVisible(!isMovieUploadModalVisible);
  };

  const handleOnToggleFeedbackSideBar = () => {
    setIsFeetbackSideBarVisible(!isFeetbackSideBarVisible);
  };

  const handleOnLeftClick = () => {
    navigate.navigate("/video-upload/trailer");
  };

  const handleOnRightClick = () => {
    navigate.navigate("/video-upload/episode");
  };

  return (
    <AuthScreenPage>
      <Button onClick={handleOnToggleMovieUploadModal}>Upload</Button>

      {movieUrl && (
        <video controls width="100%" height="600">
          <source src={movieUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {/* <MovieUploadModal onFeedback={handleOnToggleFeedbackSideBar} isVisible={isMovieUploadModalVisible} onClose={handleOnToggleMovieUploadModal} onMovieDrop={handleOnMovieDrop} isLoading={isPending} /> */}
      <VideoUploadModal isVisible={isMovieUploadModalVisible} onClose={handleOnToggleMovieUploadModal} onVideoDrop={handleOnMovieDrop} isLoading={isPending} onFeedback={handleOnToggleFeedbackSideBar} headerText={t("Feature.VideoUpload.MovieUploadModal.headerText")} title={t("Feature.VideoUpload.MovieUploadModal.title")} message={t("Feature.VideoUpload.MovieUploadModal.message")} onLeftIconClick={handleOnLeftClick} onRightIconClick={handleOnRightClick} leftTooltip={"Upload episode"} rightTooltip={"Upload trailer"} />
      <LayoutAppBar />
      <LayoutAppHeader />
      <LayoutSideBar />
    </AuthScreenPage>
  );
}
