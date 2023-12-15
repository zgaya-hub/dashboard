import { VideoDisplayCard } from "@/components/Cards";

interface EpisodeCardComponentProps {
  title: string;
  description: string;
  thumbnail?: string;
}

export default function EpisodeCardComponent({ description, thumbnail = "https://c4.wallpaperflare.com/wallpaper/1003/812/40/pakistan-cricket-imran-khan-wallpaper-preview.jpg", title }: EpisodeCardComponentProps) {
  const handleOnClickMenuIcon = () => {
    console.log("click");
  };

  return <VideoDisplayCard onClickMenuIcon={handleOnClickMenuIcon} thumbnail={thumbnail} title={title} description={description} />;
}
