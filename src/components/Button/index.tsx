import { ButtonProps as MuiButtonProps, Button as MuiButton, SxProps, CircularProgress } from "@mui/material";

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
  zeroPadding?: boolean;
}

export default function Button({ variant = "outlined", zeroPadding, children, loading, ...restProps }: ButtonProps) {
  const buttonStyle: SxProps = {
    padding: zeroPadding ? 0 : null,
  };

  return (
    <MuiButton variant={variant} disabled={loading} sx={buttonStyle} {...restProps}>
      {loading ? <CircularProgress size={15} /> : children}
    </MuiButton>
  );
}
