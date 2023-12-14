import { AvatarProps as MuiAvatarProps, Avatar as MuiAvatar, SxProps, IconButton } from "@mui/material";

interface AvatarProps extends Omit<MuiAvatarProps, "onClick"> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Avatar({ onClick, ...restProps }: AvatarProps) {
  const avatarStyle: SxProps = {
    cursor: onClick ? "pointer" : "default",
  };

  const renderAvatar = () => <MuiAvatar sx={{ ...avatarStyle, ...restProps }} />;

  if (onClick) {
    return (
      <IconButton onClick={onClick} color="inherit">
        {renderAvatar()}
      </IconButton>
    );
  }

  return renderAvatar();
}
