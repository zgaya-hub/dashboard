import { VideoPlayCard } from "@/components/Cards";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Box, SxProps } from "@mui/material";

interface EpisodeCardComponentProps {
  title: string;
  plotSummary: string;
  thumbnail: string;
}

export default function EpisodeCardComponent({ plotSummary, thumbnail, title }: EpisodeCardComponentProps) {
  const handleOnClickMenuIcon = () => {
    console.log("click");
  };

  const containerStyle = useThemeStyles<SxProps>((theme) => ({}));

  return (
    <Box sx={containerStyle}>
      <VideoPlayCard onClickMenuIcon={handleOnClickMenuIcon} thumbnail={thumbnail} title={title} description={plotSummary}></VideoPlayCard>
    </Box>
  );
}
