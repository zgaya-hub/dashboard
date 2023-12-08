import { Avatar, Stack, SxProps } from "@mui/material";
import Typography from "@/components/Typography";
import { ChevronRightIcon } from "@/components/icons";
import useUserDetail from "@/context/UserDetail.context";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface UserCardForMenuProps {
  onClick: () => void;
}

export default function UserCardForMenu({ onClick }: UserCardForMenuProps) {
  const { fullName, imageUrl, userName } = useUserDetail();

  const avatarStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(8),
    width: theme.spacing(8),
  }));

  return (
    <Stack direction={"row"} onClick={onClick} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
      <Stack direction="row" alignItems="center" gap={1}>
        <Avatar src={imageUrl} sx={avatarStyle} />
        <Stack>
          <Typography color="primary" variant="h4">
            {fullName}
          </Typography>
          <Typography color="primary">{userName}</Typography>
        </Stack>
      </Stack>
      <ChevronRightIcon />
    </Stack>
  );
}
