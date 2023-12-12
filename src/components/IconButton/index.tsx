import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from "@mui/material/IconButton";

interface IconButonProps extends MuiIconButtonProps {
  isActive?: boolean;
}

export default function IconButon({ children, ...restProps }: IconButonProps) {
  return <MuiIconButton {...restProps}>{children}</MuiIconButton>;
}
