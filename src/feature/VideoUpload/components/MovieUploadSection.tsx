import { MovierMediaEnum } from "@/types/enum";
import VideoUploadComponent from "./VideoUploadComponent";

interface MovieUploadSectionProps {
  onVideoDrop: (video: File, mediaType: MovierMediaEnum) => void;
  isLoading: boolean
}

export default function MovieUploadSection({ onVideoDrop, isLoading }: MovieUploadSectionProps) {
  const handleOnDropVideo = (video: File) => {
    onVideoDrop(video, MovierMediaEnum.MOVIE);
  };

  return <VideoUploadComponent mediaType={"movie"} onVideoDrop={handleOnDropVideo} isLoading={isLoading} />;
}
