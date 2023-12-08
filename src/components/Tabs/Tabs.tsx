import { TabsProps as MuiTabsProps, Tabs as MuiTabs } from "@mui/material";

interface TabsProps extends MuiTabsProps {}

export default function Tabs({ children, ...restProps }: TabsProps) {
  return <MuiTabs {...restProps}>{children}</MuiTabs>;
}
