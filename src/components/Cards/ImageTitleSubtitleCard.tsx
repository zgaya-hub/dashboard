import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { SxProps } from "@mui/material";
import Typography from "@/components/Typography";
import { handleOnGetTextColorForBackground } from "./utils/getTextColorForBackground";
import { handleOnGetImageBackgroundColor } from "@/utils/getImageBackgroundColor";

interface ImageTitleSubtitleCardProps {
  image: string;
  title: string;
  subtitle: string;
  loading?: boolean;
}

export default function ImageTitleSubtitleCard({ image, title, subtitle, loading }: ImageTitleSubtitleCardProps) {
  const [_textColor, setTextColor] = useState<"black" | "white">("black");

  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    boxShadow: "none",
    borderRadius: 0,
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: theme.spacing(32),
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
  }));

  useEffect(() => {
    const getColor = async () => {
      try {
        const backgroundColor = await handleOnGetImageBackgroundColor(image);
        const textColor = handleOnGetTextColorForBackground(backgroundColor ?? "");
        setTextColor(textColor);
      } catch (error) {
        console.error("Error getting color:", error);
      }
    };

    getColor();
  }, [image]);

  if (loading) {
    // Render skeleton when loading
    return (
      <Card sx={cardStyle}>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </Card>
    );
  }

  // Render content when not loading
  return (
    <Card sx={cardStyle}>
      <Typography color='primary' variant="h4">
        {title}
      </Typography>
      <Typography color='primary'>
        {subtitle}
      </Typography>
    </Card>
  );
}
