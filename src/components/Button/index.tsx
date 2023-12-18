import { ButtonProps as MuiButtonProps, Button as MuiButton, CircularProgress } from "@mui/material";

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}

export default function Button({ variant = "outlined", children, loading, ...restProps }: ButtonProps) {
  return (
    <MuiButton variant={variant} disabled={loading} {...restProps} startIcon={loading ? <CircularProgress size={15} /> : null}>
      {children}
    </MuiButton>
  );
}
