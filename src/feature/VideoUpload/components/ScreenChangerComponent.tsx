import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Stack, SxProps } from "@mui/material";

interface ScreenChangerComponentProps {
  onLeftClick: () => void;
  onRightClick: () => void;
  leftTooltip: string;
  rightTooltip: string;
}

export default function ScreenChangerComponent({ leftTooltip, onLeftClick, onRightClick, rightTooltip }: ScreenChangerComponentProps) {
  const iconContainerStyle: SxProps = {
    position: "absolute",
    transform: "translateY(-50%)",
    top: "50%",
    width: "100%",
    opacity: 0.2,
  };

  const iconStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(16),
    height: theme.spacing(16),
  }));

  return (
    <Stack sx={iconContainerStyle} direction={"row"} justifyContent={"space-between"}>
      <ChevronLeftIcon tooltipPlacement="top" tooltip={leftTooltip} onClick={onLeftClick} sx={iconStyle} />
      <ChevronRightIcon tooltipPlacement="top" tooltip={rightTooltip} onClick={onRightClick} sx={iconStyle} />
    </Stack>
  );
}
