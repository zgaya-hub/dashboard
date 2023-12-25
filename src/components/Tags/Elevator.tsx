import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { SxProps } from "@mui/material";
import { CardProps } from "@mui/material/Card";
import Stack, { StackProps } from "@mui/material/Stack";

interface ElevatorProps extends StackProps, Omit<CardProps, "classes" | "color"> {
  sx?: SxProps;
}

export default function Elevator({ children, elevation = 1, sx, ...restProps }: ElevatorProps) {
  const stackStyles = useThemeStyles<SxProps>((theme) => ({
    boxShadow: theme.shadows[elevation],
    borderRadius: theme.shape.borderRadius / 6,
    background: theme.palette.background.default,
    ...sx,
  }));

  return (
    <Stack sx={stackStyles} {...restProps}>
      {children}
    </Stack>
  );
}
