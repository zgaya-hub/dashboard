import { SxProps } from "@mui/material";
import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from "@mui/material/IconButton";

export interface IconButtonProps extends MuiIconButtonProps {
  isActive?: boolean;
}

export default function IconButon({ children, ...restProps }: IconButtonProps) {
  const buttonStyle: SxProps = {
    borderRadius: "0", // Set border radius to 0 for a square shape
  };

  return (
    <MuiIconButton sx={buttonStyle} {...restProps}>
      {children}
    </MuiIconButton>
  );
}
