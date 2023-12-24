import { CSSProperties, cloneElement } from "react";
import { ReactElement } from "react";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { MenuItem } from "react-pro-sidebar";
import { IconProps, Stack } from "@mui/material";
import Tooltip from "@/components/Tooltip";

export interface SidebarItemProps {
  icon: ReactElement<IconProps>;
  label: string;
  onClick: () => void;
  isActive: boolean;
  childrens?: SidebarItemProps[];
}

export default function SidebarItem({ icon, label, onClick, isActive }: SidebarItemProps) {
  const containerStyle: CSSProperties = {
    cursor: "pointer",
  };

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
    <Tooltip title={label} placement="left">
      <MenuItem
        style={containerStyle}
        onClick={onClick}
        icon={cloneElement(icon, {
          fontSize: "small",
        })}
      >
        {isActive ? <Stack sx={activeLineStyle} /> : null}
        {label}
      </MenuItem>
    </Tooltip>
  );
}
