import { ButtonProps as MuiButtonProps, Button as MuiButton, SxProps, CircularProgress } from "@mui/material";
import Typography from "../Typography";

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}

export default function Button({ variant = "outlined", children, loading, ...restProps }: ButtonProps) {
  const buttonStyle: SxProps = {
    "&:active": {
      transform: "scale(0.98)",
    },
  };

  return (
    <MuiButton variant={variant} disabled={loading} disableRipple sx={buttonStyle} {...restProps}>
      {loading ? <CircularProgress size={15} /> : <Typography color={"primary"}>{children}</Typography>}
    </MuiButton>
  );
}
