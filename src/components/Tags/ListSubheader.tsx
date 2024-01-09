import { ListItem, ListSubheader as MuiListSubheader, ListSubheaderProps as MuiListSubheaderProps } from "@mui/material";

interface ListSubheaderProps extends MuiListSubheaderProps {}

export default function ListSubheader({ children, sx, ...restProps }: ListSubheaderProps) {
  return (
    <MuiListSubheader {...restProps}>
      <ListItem disablePadding sx={sx}>{children}</ListItem>
    </MuiListSubheader>
  );
}
