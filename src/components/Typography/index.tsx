import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from "@mui/material";

interface TypographyProps extends MuiTypographyProps {}

export default function Typography({ children, ...restProps }: TypographyProps) {
  return <MuiTypography {...restProps}>{children}</MuiTypography>;
}
