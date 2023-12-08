import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from "@mui/material/IconButton";
import { SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface IconButonProps extends MuiIconButtonProps {
  isActive?: boolean;
}

export default function IconButon({ isActive, onClick, children, ...restProps }: IconButonProps) {
  const iconButtonStyle = useThemeStyles<SxProps>((theme) => ({
    background: isActive ? theme.palette.action.active : theme.palette.background.paper,
    fontSize: 100
  }));

  return (
    <MuiIconButton sx={iconButtonStyle} onClick={onClick} color="inherit" {...restProps}>
      {children}
    </MuiIconButton>
  );
}
