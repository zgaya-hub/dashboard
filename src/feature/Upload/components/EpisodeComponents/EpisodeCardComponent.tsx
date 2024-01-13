import { Box } from "@mui/material";

import { VideoPlayCard } from "@/components/Cards";

interface EpisodeCardComponentProps {
  title: string;
  plotSummary: string;
  videoId: string;
}

export default function EpisodeCardComponent({ plotSummary, videoId, title }: EpisodeCardComponentProps) {
  // const {} = 
  const handleOnClickMenuIcon = () => {
    alert("click");
  };

  return (
    <Box>
      <VideoPlayCard onClickMenuIcon={handleOnClickMenuIcon} videoUrl="" title={title} description={plotSummary}></VideoPlayCard>
    </Box>
  );
}
