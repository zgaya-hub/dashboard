import { Box } from "@mui/material";

import { VideoPlayCard } from "@/components/Cards";

interface MovieCardComponentProps {
  title: string;
  plotSummary: string;
  source: string;
}

export default function MovieCardComponent({ plotSummary, source, title }: MovieCardComponentProps) {
  const handleOnClickMenuIcon = () => {
    alert("click");
  };

  return (
    <Box>
      <VideoPlayCard onClickMenuIcon={handleOnClickMenuIcon} videoUrl={source} title={title} description={plotSummary}></VideoPlayCard>
    </Box>
  );
}
