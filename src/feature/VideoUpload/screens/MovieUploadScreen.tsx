import { useState } from "react";
import { Stack } from "@mui/material";
import Button from "@/components/Button";
import { AuthScreenPaper } from "@/components/Paper";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import { MovierMediaEnum } from "@/types/enum";
import { extractVideoMetadata, extractVideoUrl } from "metalyzer";
import { useGetUploadVideoSignedUrl } from "../hooks/queryHooks";
import MovieUploadModal from "../components/MovieUploadModal";

export default function MovieUploadScreen() {
  const [isMovieUploadModalVisible, setIsMovieUploadModalVisible] = useState(true);
  const [movieUrl, setMovieUrl] = useState<string | null>(null);
  const { mutateAsync: getUploadMovieUrlMutateAsync, isPending } = useGetUploadVideoSignedUrl();

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

    setMovieUrl(await extractVideoUrl(movie));
    handleOnToggleMovieUploadModal();
  };

  const handleOnToggleMovieUploadModal = () => {
    setIsMovieUploadModalVisible(!isMovieUploadModalVisible);
  };

  return (
    <AuthScreenPaper>
        <Button onClick={handleOnToggleMovieUploadModal}>Upload</Button>

      {movieUrl && (
        <video controls width="100%" height="600">
          <source src={movieUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <MovieUploadModal isVisible={isMovieUploadModalVisible} onClose={handleOnToggleMovieUploadModal} onMovieDrop={handleOnMovieDrop} isLoading={isPending} />
      <LayoutAppBar />
      <LayoutAppHeader />
      <LayoutSideBar />
    </AuthScreenPaper>
  );
}
