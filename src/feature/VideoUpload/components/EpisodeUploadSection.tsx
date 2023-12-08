import { MovierMediaEnum } from "@/types/enum";
import VideoUploadComponent from "./VideoUploadComponent";

interface EpisodeUploadSectionProps {
  onVideoDrop: (video: File, mediaType: MovierMediaEnum) => void;
  isLoading: boolean;
}

export default function EpisodeUploadSection({ onVideoDrop, isLoading }: EpisodeUploadSectionProps) {
  const handleOnDropVideo = (video: File) => {
    onVideoDrop(video, MovierMediaEnum.EPISODE);
  };

  return <VideoUploadComponent  mediaType={"episode"} onVideoDrop={handleOnDropVideo} isLoading={isLoading} />;
}
