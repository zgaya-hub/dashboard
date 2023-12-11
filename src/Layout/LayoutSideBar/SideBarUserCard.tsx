import ImageTitleSubtitleCard from "@/components/Cards/ImageTitleSubtitleCard";
import useUserDetail from "@/context/UserDetail.context";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Avatar, Stack, SxProps } from "@mui/material";

export function ExpandSideBarUserCard() {
  const { fullName, imageUrl, userName } = useUserDetail();

  return <ImageTitleSubtitleCard image={imageUrl} title={fullName} subtitle={userName} />;
}

export function CollapsedSideBarUserCard() {
  const { imageUrl } = useUserDetail();

  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    paddingTop:theme.spacing(2)
  }));

  return (
    <Stack alignItems={"center"} sx={containerStyle}>
      <Avatar src={imageUrl} />
    </Stack>
  );
}
