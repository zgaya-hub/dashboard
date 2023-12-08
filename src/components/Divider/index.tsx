import { Divider as MuiDivider, DividerProps as MuiDividerProps } from "@mui/material";

interface DividerProps extends MuiDividerProps {}

export default function Divider({ ...restProps }: DividerProps) {
  return <MuiDivider {...restProps} />;
}
