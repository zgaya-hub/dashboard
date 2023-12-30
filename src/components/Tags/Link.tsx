import AuthenticatedRouteParams from "@/navigation/Authenticated.routes.params";
import UnAuthenticatedRouteParams from "@/navigation/UnAuthenticated.routes.params";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Typography, Link as MuiLink, SxProps } from "@mui/material";
import { CSSProperties } from "react";
import { Link as RouterDomLink, LinkProps as RouterDomLinkProps } from "react-router-dom";

interface LinkProps extends Omit<RouterDomLinkProps, "to"> {
  to: keyof AuthenticatedRouteParams | keyof UnAuthenticatedRouteParams;
}

export default function Link({ children, ...restProps }: LinkProps) {
  const linkStyle = useThemeStyles<CSSProperties>((theme) => ({
    textDecoration: "none",
    fontSize: theme.typography.body1.fontSize,
    color: `${theme.typography.body1.color}!important`,
  }));
  return (
    <RouterDomLink style={linkStyle} {...restProps}>
      {children}
    </RouterDomLink>
  );
}
