import { ListItemAvatar, ListItemText, SxProps } from "@mui/material";
import { LogoutIcon } from "@/components/icons";
import useUserDetail from "@/context/UserDetail.context";
import { MenuHeader } from "@/components/Menu";
import Avatar from "@/components/Avatar";

interface UserCardForMenuProps {
  onClick: () => void;
  onLogout: () => void;
}

export default function UserCardForMenu({ onClick, onLogout }: UserCardForMenuProps) {
  const { fullName, imageUrl, userName } = useUserDetail();

  const avatarStyle: SxProps = {
    width: 56,
    height: 56,
    mr: 1,
  };

  return (
    <MenuHeader onClick={onClick} secondaryAction={<LogoutIcon onClick={onLogout} />}>
      <ListItemAvatar>
        <Avatar sizes="small" src={imageUrl} sx={avatarStyle} />
      </ListItemAvatar>
      <ListItemText primary={fullName} secondary={userName} tabIndex={10} />
    </MenuHeader>
  );
}
