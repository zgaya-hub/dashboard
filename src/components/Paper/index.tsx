import { PaperProps as MuiPaperProps, Paper as MuiPaper } from "@mui/material";

export interface PaperProps extends MuiPaperProps {}

export function Paper({ children, ...restProps }: PaperProps) {
  return <MuiPaper {...restProps}>{children}</MuiPaper>;
}
