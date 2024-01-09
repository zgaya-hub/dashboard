import { CSSProperties, cloneElement } from "react";
import { ReactElement } from "react";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { MenuItem } from "react-pro-sidebar";
import { ButtonBase, Stack } from "@mui/material";
import Tooltip from "@/components/Tooltip";
import { IconWrapperProps } from "@/components/icons";

export interface SidebarItemProps {
  icon: ReactElement<IconWrapperProps>;
  label: string;
  onClick: () => void;
  isActive: boolean;
  childrens?: SidebarItemProps[];
}

export default function SidebarItem({ icon, label, onClick, isActive }: SidebarItemProps) {
  const containerStyle = useThemeStyles<CSSProperties>((theme) => ({
    cursor: "pointer",
    background: isActive ? theme.palette.action.selected : "",
  }));

  const activeLineStyle = useThemeStyles((theme) => ({
    width: theme.spacing(0.5),
    background: theme.palette.primary.main,
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    borderRadius: theme.shape.borderRadius,
  }));

  return (
    <Tooltip title={label} placement="left">
      <MenuItem
        style={containerStyle}
        onClick={onClick}
        icon={cloneElement(icon, {
          fontSize: "small",
          solid: isActive,
          color: isActive ? "primary" : "inherit",
        })}
      >
        {isActive ? <Stack sx={activeLineStyle} /> : null}
        {label}
      </MenuItem>
    </Tooltip>
  );
}
