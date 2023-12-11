import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { FabProps as MuiFabProps, Fab as MuiFab, SxProps, CircularProgress } from "@mui/material";

interface FabProps extends MuiFabProps {
  loading?: boolean;
}

export default function Fab({ variant = "circular", children, loading, ...restProps }: FabProps) {
  const fabStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.default,
    boxShadow: theme.shadow.neutral,
    "&:hover": {
      boxShadow: theme.shadow.neutral,
    },
    "& .Mui-disabled": {
      boxShadow: theme.shadow.neutral
    },
    "& .Mui-focusVisible": {
      boxShadow: theme.shadow.neutral
    },
    "& .MuiFab-circular": {
      boxShadow: theme.shadow.neutral
    },
    "& .MuiFab-colorInherit": {
      boxShadow: theme.shadow.neutral
    },
    "& .MuiFab-extended": {
      boxShadow: theme.shadow.neutral
    },
    "& .MuiFab-primary": {
      boxShadow: theme.shadow.neutral
    },
    "& .MuiFab-root": {
      boxShadow: theme.shadow.neutral
    },
    "& .MuiFab-secondary": {
      boxShadow: theme.shadow.neutral
    },
    "& .MuiFab-sizeMedium": {
      boxShadow: theme.shadow.neutral
    },
    "& .MuiFab-sizeSmal": {
      boxShadow: theme.shadow.neutral
    },
  }));

  return (
    <MuiFab variant={variant} disabled={loading} sx={fabStyle} {...restProps}>
      {loading ? <CircularProgress size={10} /> : children}
    </MuiFab>
  );
}
