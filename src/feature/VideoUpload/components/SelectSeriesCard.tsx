import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import useUserDetail from "@/context/UserDetail.context";
import { FastForwardIcon, FastRewindIcon, PlayArrowIcon } from "@/components/icons";
import { Stack, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface SelectSeriesCardProps {
  thumbnail: string;
  title: string;
  onPlay: (ID: string) => void;
  ID: string;
}

export default function SelectSeriesCard({ ID, onPlay, thumbnail, title }: SelectSeriesCardProps) {
  const { imageUrl } = useUserDetail();

  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    display: "flex",
    cursor: "pointer",
    justifyContent: 'space-between',
    height: theme.spacing(15),
    width: theme.spacing(40),
  }));

  return (
    <Card sx={cardStyle}>
      <Stack alignItems={"center"} justifyContent={"center"}>
        <CardContent>
          <Typography variant="body1">Live From Space</Typography>
        </CardContent>
        <Stack direction={"row"} alignItems={"center"}>
          <FastRewindIcon fontSize="small" />
          <PlayArrowIcon onClick={() => onPlay(ID)} fontSize="large" />
          <FastForwardIcon fontSize="small" />
        </Stack>
      </Stack>
      <CardMedia component="img" sx={{ width: "50%" }} image={imageUrl} />
    </Card>
  );
}
