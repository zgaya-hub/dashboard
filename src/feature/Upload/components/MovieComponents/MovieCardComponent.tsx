import { VideoPlayCard } from "@/components/Cards";
import { Box } from "@mui/material";

interface MovieCardComponentProps {
  title: string;
  plotSummary: string;
  thumbnail: string;
}

export default function MovieCardComponent({ plotSummary, thumbnail, title }: MovieCardComponentProps) {
  const handleOnClickMenuIcon = () => {
    console.log("click");
  };

  return (
    <Box>
      <VideoPlayCard onClickMenuIcon={handleOnClickMenuIcon} thumbnail={thumbnail} title={title} description={plotSummary}></VideoPlayCard>
    </Box>
  );
}
