import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { SxProps, CardContent, Typography, ButtonBase } from "@mui/material";

interface SimpleCineastCardProps {
  imageSrc: string;
  name: string;
  profession: string;
}

export default function SimpleCineastCard({ imageSrc, name, profession }: SimpleCineastCardProps) {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(24),
    height: theme.spacing(36),
  }));

  const cardImageStyle = useThemeStyles<SxProps>((theme) => ({
    width: "100%",
    height: theme.spacing(24),
  }));

  const cardContentStyle: SxProps = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  return (
    <ButtonBase>
      <Card sx={cardStyle}>
        <CardMedia sx={cardImageStyle} component="img" image={imageSrc} />
        <CardContent sx={cardContentStyle}>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="overline">{profession}</Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}
