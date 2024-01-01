import AuthenticatedRouteParams from "@/navigation/Authenticated.routes.params";
import UnAuthenticatedRouteParams from "@/navigation/UnAuthenticated.routes.params";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { CSSProperties } from "react";
import { Path, Link as RouterDomLink, LinkProps as RouterDomLinkProps } from "react-router-dom";

interface LinkProps extends Omit<RouterDomLinkProps, "to"> {
  to: keyof AuthenticatedRouteParams | keyof UnAuthenticatedRouteParams | Partial<Path>;
}

export default function Link({ to, children, ...restProps }: LinkProps) {
  const linkStyle = useThemeStyles<CSSProperties>((theme) => ({
    textDecoration: "none",
    ...theme.typography.body1,
  }));

  return (
    <RouterDomLink style={linkStyle} to={to} {...restProps}>
      {children}
    </RouterDomLink>
  );
}
