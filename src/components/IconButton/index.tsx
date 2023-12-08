import React from "react";
import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from "@mui/material/IconButton";
import { SvgIconProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface IconButonProps extends MuiIconButtonProps {
  isActive?: boolean;
  icon: React.ComponentType<SvgIconProps>;
}

export default function IconButon({ isActive, onClick, icon: Icon, ...restProps }: IconButonProps) {
  const iconButtonStyle = useThemeStyles((theme) => ({
    background: isActive ? theme.palette.action.active : theme.palette.background.paper,
  }));

  <MuiIconButton onClick={onClick} color="inherit" {...restProps}>
    <Icon sx={iconButtonStyle} />
  </MuiIconButton>;
}
