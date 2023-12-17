import MuiTooltip from "@mui/material/Tooltip";
import { TooltipProps as MuiTooltipProps } from "@mui/material";

interface TooltipProps extends MuiTooltipProps {}

export default function Tooltip({ ...restProps }: TooltipProps) {
  return <MuiTooltip {...restProps} />;
}
