import { AvatarProps as MuiAvatarProps, Avatar as MuiAvatar, IconButton, SxProps } from "@mui/material";

interface AvatarProps extends Omit<MuiAvatarProps, "onClick" | "sx"> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sx?: SxProps;
}

export default function Avatar({ onClick, sx, ...restProps }: AvatarProps) {
  const avatarStyle: SxProps = {
    cursor: onClick ? "pointer" : "default",
    ...sx,
  };

  const renderAvatar = () => <MuiAvatar sx={avatarStyle} {...restProps} />;

  if (onClick) {
    return (
      <IconButton onClick={onClick} color="inherit">
        {renderAvatar()}
      </IconButton>
    );
  }

  return renderAvatar();
}
