import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { AuthScreenPaper } from "@/components/Paper";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import { MovierMediaEnum } from "@/types/enum";
import { extractVideoMetadata, extractVideoUrl } from "metalyzer";
import { useGetUploadVideoSignedUrl } from "../hooks/queryHooks";
import TrailerUploadModal from "../components/TrailerUploadModal";
import Button from "@/components/Button";

export default function TrailerUploadScreen() {
  const [isTrailerUploadModalVisible, setIsTrailerUploadModalVisible] = useState(true);
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

  return (
    <AuthScreenPaper>
        <Button onClick={handleOnToggleTrailerUploadModal}>Upload</Button>
      {trailerUrl && (
        <video controls width="100%" height="600">
          <source src={trailerUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <TrailerUploadModal isVisible={isTrailerUploadModalVisible} onClose={handleOnToggleTrailerUploadModal} onTrailerDrop={handleOnTrailerDrop} isLoading={isPending} />
      <LayoutAppBar />
      <LayoutAppHeader />
      <LayoutSideBar />
    </AuthScreenPaper>
  );
}
