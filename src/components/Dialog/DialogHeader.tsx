import { DialogTitle, DialogTitleProps, IconProps, SxProps } from "@mui/material";
import { ReactElement } from "react";
import Typography from "../Typography";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface DialogHeaderProps extends Omit<DialogTitleProps, "sx"> {
  title?: string;
  rightIcons?: ReactElement<IconProps>[];
  isDragable?: boolean;
  sx?: SxProps;
}

export default function DialogHeader({ title, rightIcons = [], sx, isDragable, ...restProps }: DialogHeaderProps) {
  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.default,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: isDragable ? "move" : "default",
    ...sx,
  }));

  const titleStyle: SxProps = {
    textAlign: "center",
    flex: 1,
  };

  return (
    <DialogTitle flexDirection={"row"} sx={containerStyle} {...restProps}>
      <Typography variant="h3" sx={titleStyle} color={"primary"}>
        {title}
      </Typography>
      {rightIcons.map((icon) => icon)}
    </DialogTitle>
  );
}
