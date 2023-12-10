import { SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Dialog } from "@/components/Dialog";

interface SeriesAndSeasonSelectComponentProps {
  isVisible: boolean;
}

export default function SeriesAndSeasonSelectComponent({ isVisible }: SeriesAndSeasonSelectComponentProps) {
  const dialogBoxStyle = useThemeStyles<SxProps>((theme) => ({
    height: "fit-content",
    position: "relative",
    ".MuiDialog-paperWidthXl": {
      width: "70%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    "& .MuiDialog-paperWidthXl": {
      background: theme.palette.background.default,
    },
  }));

  return (
    <Dialog headerText="Select Series and Season" open={isVisible} sx={dialogBoxStyle}>
        
    </Dialog>
  );
}
