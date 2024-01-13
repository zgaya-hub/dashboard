import { Card, CardMedia, SxProps } from "@mui/material";

import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface ImageDisplay24X12CardProps {
  src: string;
}

export default function ImageDisplayCard24X12({ src }: ImageDisplay24X12CardProps) {
  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(12),
    width: theme.spacing(24),
  }));

  const imageStyle: SxProps = {
    height: "100%",
    width: "100%",
  };

  return (
    <Card sx={containerStyle}>
      <CardMedia component={"image"} src={src} sx={imageStyle} />
    </Card>
  );
}
