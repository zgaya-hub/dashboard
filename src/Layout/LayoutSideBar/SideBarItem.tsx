import { CSSProperties, cloneElement } from "react";
import { ReactElement } from "react";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { MenuItem } from "react-pro-sidebar";
import { Box, IconProps } from "@mui/material";
import Typography from "@/components/Typography";

export interface SidebarItemProps {
  icon: ReactElement<IconProps>;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

export default function SidebarItem({ icon, label, onClick, isActive }: SidebarItemProps) {
  const containerStyle = useThemeStyles<CSSProperties>((theme) => ({
    cursor: "pointer",
    background: isActive ? theme.palette.action.active : "transparent",
  }));

  const activeLineStyle = useThemeStyles((theme) => ({
    width: 0.02,
    background: theme.palette.primary.main,
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    borderBottomRightRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
  }));

  return (
    <MenuItem
      style={containerStyle}
      onClick={onClick}
      icon={cloneElement(icon, {
        fontSize: "small",
      })}
    >
      {isActive ? <Box sx={activeLineStyle} /> : null}
      <Typography variant="h6" color="primary">
        {label}
      </Typography>
    </MenuItem>
  );
}
