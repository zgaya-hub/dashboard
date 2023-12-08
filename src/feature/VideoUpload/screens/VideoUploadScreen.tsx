import { useRef, useState } from "react";
import { Stack } from "@mui/material";
import Button from "@/components/Button";
import { AuthScreenPaper } from "@/components/Paper";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import VideoUploadModal from "../components/VideoUploadModal";
import { VideoUploadSectionEnum } from "../enum";
import { MovierMediaEnum } from "@/types/enum";
import { extractVideoMetadata } from "meta-hervest";
import { useGetUploadVideoSignedUrl } from "../hooks/queryHooks";

export default function VideoUploadScreen() {
  const sectionRef = useRef<VideoUploadSectionEnum>(VideoUploadSectionEnum.MOVIE);
  const [isVideoUploadModalVisible, setIsVideoUploadModalVisible] = useState(true);
  const { mutateAsync: getUploadVideoUrlMutateAsync, isPending } = useGetUploadVideoSignedUrl();

  const handleOnDropVideo = async (video: File, mediaType: MovierMediaEnum) => {
    // Use a Video element to get video metadata
    const videoMetadata = await extractVideoMetadata(video);
    const result = await getUploadVideoUrlMutateAsync({
      Height: videoMetadata.videoHeight!,
      Width: videoMetadata.videoWidth!,
      MediaType: mediaType,
      Mime: videoMetadata.mimeType,
      RunTime: videoMetadata.videoDuration,
      SizeInKb: videoMetadata.fileSizeKB,
    });
  };

  const handleOnToggleVideoUploadModal = () => {
    setIsVideoUploadModalVisible(!isVideoUploadModalVisible);
  };

  return (
    <AuthScreenPaper>
      <Stack direction={"row"} alignItems={"center"}>
        <Button onClick={handleOnToggleVideoUploadModal}>Upload</Button>
      </Stack>
      <VideoUploadModal isVisible={isVideoUploadModalVisible} onClose={handleOnToggleVideoUploadModal} defaultSection={sectionRef.current} onVideoDrop={handleOnDropVideo} isLoading={isPending} />
      <LayoutAppBar />
      <LayoutAppHeader />
      <LayoutSideBar />
    </AuthScreenPaper>
  );
}
