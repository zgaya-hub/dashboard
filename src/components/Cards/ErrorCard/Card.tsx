import { Card, CardContent, CardHeader, SxProps, Typography } from "@mui/material";
import { ProblemIcon } from "@/components/icons";
import { ReactNode } from "react";
import { Variant } from "@mui/material/styles/createTypography";

interface SeriesDetailsErrorCardProps {
  errorMessage?: string;
  action?: ReactNode;
  fullWidth?: boolean;
  height?: number;
  width?: number;
  minHeight?: number;
  minWidth?: number;
  iconSize?: number;
  textVariant?: Variant;
}

export default function ErrorCard({ errorMessage, action, fullWidth, height, minHeight, minWidth, width, iconSize, textVariant = "body1" }: SeriesDetailsErrorCardProps) {
  const errorIconContainer: SxProps = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: width && !fullWidth ? width : "100%",
    height: height,
    alignItems: "center",
    minHeight: minHeight,
    minWidth: minWidth,
  };

  return (
    <Card>
      {action ? <CardHeader action={action} /> : null}
      <CardContent sx={errorIconContainer}>
        <ProblemIcon sx={{ fontSize: iconSize ?? 100 }} color="error" />
        <Typography align="center" variant={textVariant}>
          {errorMessage}
        </Typography>
      </CardContent>
    </Card>
  );
}
