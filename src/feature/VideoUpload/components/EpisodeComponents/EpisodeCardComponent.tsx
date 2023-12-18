import { VideoDisplayCard } from "@/components/Cards";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import MoreVert from "@mui/icons-material/MoreVert";
import { Box, Card, CardContent, SxProps, Typography } from "@mui/material";

interface EpisodeCardComponentProps {
  title: string;
  plotSummary: string;
  thumbnail: string;
}

export default function EpisodeCardComponent({ plotSummary, thumbnail, title }: EpisodeCardComponentProps) {
  const handleOnClickMenuIcon = () => {
    console.log("click");
  };

  const containerStyle = useThemeStyles<SxProps>((theme) => ({
  }));

  return (
    <Box sx={containerStyle}>
      <VideoDisplayCard onClickMenuIcon={handleOnClickMenuIcon} thumbnail={thumbnail} title={title} description={plotSummary}>
      </VideoDisplayCard>
    </Box>
  );
}
