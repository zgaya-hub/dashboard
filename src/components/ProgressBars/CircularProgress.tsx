import { CircularProgress as MuiCircularProgress, Box, Typography, CircularProgressProps as MuiCircularProgressProps } from "@mui/material";

interface CircularProgressProps extends MuiCircularProgressProps {
  value?: number;
  text?: string;
}

export default function CircularProgress({ value, text, ...props }: CircularProgressProps) {
  const circularProgressStyle = {
    "& .MuiCircularProgress-circle": {
      strokeLinecap: "round",
    },
    "& .MuiCircularProgress-circleStatic": {
      strokeLinecap: "round",
    },
  };
  return (
    <Box position="relative" display="inline-flex">
      <MuiCircularProgress variant={value !== undefined ? "determinate" : "indeterminate"} value={value} sx={circularProgressStyle} {...props} title="30" />
      {text !== undefined && (
        <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
          <Typography variant="caption">{text}</Typography>
        </Box>
      )}
    </Box>
  );
}
