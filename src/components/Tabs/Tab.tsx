import { TabProps as MuiTabProps, Tab as MuiTab } from "@mui/material";

interface TabProps extends MuiTabProps {}
export default function Tab({ children, ...restProps }: TabProps) {
  return <MuiTab {...restProps}>{children}</MuiTab>;
}
