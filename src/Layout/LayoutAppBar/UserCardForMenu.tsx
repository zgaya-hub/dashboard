import { ListItem, ListItemAvatar, ListItemText,  SxProps } from "@mui/material";
import { LogoutIcon } from "@/components/icons";
import useUserDetail from "@/context/UserDetail.context";
import Avatar from "@/components/Avatar";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { ListSubheader } from "@/components/Tags";

interface UserCardForMenuProps {
  onClick: () => void;
  onLogout: () => void;
}

export default function UserCardForMenu({ onClick, onLogout }: UserCardForMenuProps) {
  const { fullName, imageUrl, userName } = useUserDetail();

  const avatarStyle = useThemeStyles<SxProps>((theme) => ({
    width: 56,
    height: 56,
    marginRight: theme.spacing(1),
  }));

  return (
    <ListSubheader onClick={onClick} disableGutters>
      <ListItem secondaryAction={<LogoutIcon onClick={onLogout} />}>
        <ListItemAvatar>
          <Avatar sizes="small" src={imageUrl} sx={avatarStyle} />
        </ListItemAvatar>
        <ListItemText
          primary={fullName}
          primaryTypographyProps={{
            variant: "subtitle1",
          }}
          secondary={userName}
          secondaryTypographyProps={{
            variant: "subtitle2",
          }}
        />
      </ListItem>
    </ListSubheader>
  );
}
