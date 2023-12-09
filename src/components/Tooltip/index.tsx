import { useState } from "react";
import MuiTooltip from "@mui/material/Tooltip";
import { TooltipProps as MuiTooltipProps } from "@mui/material";

interface TooltipProps extends MuiTooltipProps {
  hoverDelay?: number;
}

export default function Tooltip({ hoverDelay = 100, ...restProps }: TooltipProps) {
  const [isTooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setTimeout(() => {
      setTooltipVisible(true);
    }, hoverDelay);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return <MuiTooltip arrow {...restProps} open={isTooltipVisible} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
}
