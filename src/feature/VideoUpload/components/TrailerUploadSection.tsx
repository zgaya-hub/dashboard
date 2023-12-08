import { MovierMediaEnum } from "@/types/enum";
import VideoUploadComponent from "./VideoUploadComponent";

interface TrailerUploadSectionProps {
  onVideoDrop: (video: File, mediaType: MovierMediaEnum) => void;
  isLoading: boolean;
}

export default function TrailerUploadSection({ onVideoDrop, isLoading }: TrailerUploadSectionProps) {
  const handleOnDropVideo = (video: File) => {
    onVideoDrop(video, MovierMediaEnum.TRAILER);
  };

  return <VideoUploadComponent isLoading={isLoading} mediaType={"trailer"} onVideoDrop={handleOnDropVideo} />;
}
