import { ListItem, ListItemProps } from "@mui/material";

interface MenuHeaderProps extends ListItemProps {}

export default function MenuHeader({ children, ...restProps }: MenuHeaderProps) {
  return <ListItem {...restProps}>{children}</ListItem>;
}
