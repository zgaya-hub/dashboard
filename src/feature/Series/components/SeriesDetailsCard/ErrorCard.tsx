import { Card, CardContent, CardHeader, SxProps, Typography } from "@mui/material";
import { CachedIcon, WarningIcon } from "@/components/icons";

interface SeriesDetailsErrorCardProps {
  errorMessage: string;
  onRefetch: () => void;
}

export default function SeriesDetailsErrorCard({ errorMessage, onRefetch }: SeriesDetailsErrorCardProps) {
  const errorIconContainer: SxProps = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  };

  return (
    <Card>
      <CardHeader action={<CachedIcon onClick={onRefetch} />} />
      <CardContent sx={errorIconContainer}>
        <WarningIcon sx={{ fontSize: 200 }} color="error" />
        <Typography variant="h5">{errorMessage}</Typography>
      </CardContent>
    </Card>
  );
}
