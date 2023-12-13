import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FastForwardIcon, FastRewindIcon, PlayArrowIcon } from "@/components/icons";
import { ButtonBase, Stack, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface SelectSeriesCardProps {
  thumbnail: string;
  title: string;
}

export default function SelectSeriesCard({ thumbnail, title }: SelectSeriesCardProps) {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    display: "flex",
    cursor: "pointer",
    justifyContent: "space-between",
    height: theme.spacing(15),
    width: theme.spacing(40),
  }));

  return (
    <Card sx={cardStyle}>
      <ButtonBase>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <CardContent>
            <Typography variant="body1">{title}</Typography>
          </CardContent>
          <Stack direction={"row"} alignItems={"center"}>
            <FastRewindIcon fontSize="small" />
            <PlayArrowIcon onClick={() => {}} fontSize="large" />
            <FastForwardIcon fontSize="small" />
          </Stack>
        </Stack>
        <CardMedia component="img" sx={{ width: "50%" }} image={thumbnail} />
      </ButtonBase>
    </Card>
  );
}
