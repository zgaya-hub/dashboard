import { ReactNode } from "react";
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "subtitle1" | "caption" | "button";
type TypographyColor = "secondary" | "primary" | "disabled";

interface TypographyProps extends Omit<MuiTypographyProps, "variant"> {
  color: TypographyColor;
  sx?: SxProps;
  children: ReactNode;
  variant?: TypographyVariant;
}

export default function Typography({ children, color, sx, variant = "body1", ...restProps }: TypographyProps) {
  const typographyStyle = useThemeStyles<SxProps>((theme) => ({
    color: theme.palette.text[color],
    ...sx,
  }));

  const fontSize = useThemeStyles((theme) => theme.typography[variant].fontSize!);
  const fontWeight = useThemeStyles((theme) => theme.typography[variant].fontWeight!);

  return (
    <MuiTypography fontSize={fontSize} sx={typographyStyle} fontWeight={fontWeight} {...restProps}>
      {children}
    </MuiTypography>
  );
}
