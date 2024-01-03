import Card from "@mui/material/Card";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { SxProps, CardContent, Typography, Box, alpha, Stack, CardMedia } from "@mui/material";
import { format } from "date-fns";
import { DEFAULT_DATE_FORMAT_2, DEFAULT_TIME_FORMAT } from "@/mock/constants";

interface VideoShareModalCardProps {
  imageSrc: string;
  title: string;
  runTime: number;
  releaseDate: number;
}

export default function VideoShareModalCard({ imageSrc, title, runTime, releaseDate }: VideoShareModalCardProps) {
  const cardStyle = useThemeStyles<SxProps>(() => ({
    display: "flex",
    width: "100%",
  }));

  const cardImageStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(36),
    height: theme.spacing(16),
  }));

  const runTimeBadgeStyle = useThemeStyles<SxProps>((theme) => ({
    background: alpha(theme.palette.divider, 0.4),
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  }));

  return (
    <Card sx={cardStyle}>
      <Box position="relative" gap={10}>
        <CardMedia sx={cardImageStyle} component="img" image={imageSrc} />
        <Stack sx={runTimeBadgeStyle} position="absolute" py={0.1} px={0.5}>
          <Typography variant="caption" color={"Background"}>
            {format(runTime, DEFAULT_TIME_FORMAT)}
          </Typography>
        </Stack>
      </Box>
      <CardContent>
        <Typography variant="h6" mb={1}>
          {title}
        </Typography>
        <Typography variant="caption" mb={10}>
          Publish at: {format(releaseDate, DEFAULT_DATE_FORMAT_2)}
        </Typography>
      </CardContent>
    </Card>
  );
}
