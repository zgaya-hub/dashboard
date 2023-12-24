import { VideoPlayCard } from "@/components/Cards";

interface EpisodeCardComponentProps {
  title: string;
  plotSummary: string;
  thumbnail: string;
}

export default function EpisodeCardComponent({ plotSummary, thumbnail, title }: EpisodeCardComponentProps) {
  const handleOnClickMenuIcon = () => {
    console.log("click");
  };

  return <VideoPlayCard onClickMenuIcon={handleOnClickMenuIcon} thumbnail={thumbnail} title={title} description={plotSummary}></VideoPlayCard>;
}
