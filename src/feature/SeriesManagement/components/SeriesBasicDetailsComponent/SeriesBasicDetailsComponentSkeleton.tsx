import { Elevator } from "@/components/Tags";
import { CachedIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { CircularProgress, Skeleton } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export default function SeriesBasicDetailsComponentSkeleton() {
  const { t } = useTranslation();

  const menuItemStyle = useThemeStyles<SxProps>((theme) => ({
    justifyContent: "space-between",
    padding: theme.spacing(1),
  }));

  const menuHeaderStyle = useThemeStyles<SxProps>((theme) => ({
    justifyContent: "space-between",
    padding: theme.spacing(1),
    "&:hover": {
      bgcolor: theme.palette.background.default,
    },
    cursor: "default",
  }));

  const textSkeletonWidth = useThemeStyles<string>((theme) => theme.spacing(24));

  return (
    <Elevator p={2}>
      <MenuItem sx={menuHeaderStyle} disableRipple>
        <Typography variant="h5">{t("Feature.SeriesManagement.SeriesBasicDetailsComponent.title")}</Typography>
        <CachedIcon onClick={() => {}} loading />
      </MenuItem>
      <MenuItem sx={menuItemStyle}>
        <Typography variant="h6">{t("Feature.SeriesManagement.SeriesBasicDetailsComponent.title")}</Typography>
        <Skeleton width={textSkeletonWidth}></Skeleton>
      </MenuItem>
      <MenuItem sx={menuItemStyle}>
        <Typography variant="h6">{t("Feature.SeriesManagement.SeriesBasicDetailsComponent.plotSummary")}</Typography>
        <Skeleton width={textSkeletonWidth}></Skeleton>
      </MenuItem>
      <MenuItem sx={menuItemStyle}>
        <Typography variant="h6">{t("Feature.SeriesManagement.SeriesBasicDetailsComponent.releaseDate")}</Typography>
        <Skeleton width={textSkeletonWidth}></Skeleton>
      </MenuItem>
    </Elevator>
  );
}
