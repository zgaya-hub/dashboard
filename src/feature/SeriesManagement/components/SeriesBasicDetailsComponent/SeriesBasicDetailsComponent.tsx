import { useGetMediaBasicInfoByMediaId } from "../../hooks/queryHooks";
import { Elevator } from "@/components/Tags";
import { MenuItem, Stack, SxProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import SeriesBasicDetailsComponentSkeleton from "./SeriesBasicDetailsComponentSkeleton";
import { CachedIcon, ErrorIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { handleOnTruncateText } from "@/utils";

interface SeriesBasicDetailsComponentProps {
  seriesId: string;
}

export default function SeriesBasicDetailsComponent({ seriesId }: SeriesBasicDetailsComponentProps) {
  const { t } = useTranslation();
  const { isFetching, data, refetch, isError, error } = useGetMediaBasicInfoByMediaId({ MediaId: seriesId });

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

  if (isFetching) {
    return <SeriesBasicDetailsComponentSkeleton />;
  }

  return (
    <Elevator p={2}>
      <MenuItem sx={menuHeaderStyle} disableRipple>
        <Typography variant="h5">{t("Feature.SeriesManagement.SeriesBasicDetailsComponent.basicInfo")}</Typography>
        <Stack direction={"row"}>
          {isError ? <ErrorIcon tooltip={error.message} onClick={() => {}} /> : null}
          <CachedIcon onClick={() => refetch()} />
        </Stack>
      </MenuItem>
      <MenuItem sx={menuItemStyle}>
        <Typography variant="h6">{t("Feature.SeriesManagement.SeriesBasicDetailsComponent.title")}</Typography>
        <Typography>{data?.title}</Typography>
      </MenuItem>
      <MenuItem sx={menuItemStyle}>
        <Typography variant="h6">{t("Feature.SeriesManagement.SeriesBasicDetailsComponent.plotSummary")}</Typography>
        <Typography>{handleOnTruncateText(data?.plotSummary ?? "", 20)}</Typography>
      </MenuItem>
      <MenuItem sx={menuItemStyle}>
        <Typography variant="h6">{t("Feature.SeriesManagement.SeriesBasicDetailsComponent.releaseDate")}</Typography>
        <Typography>{data?.releaseDate}</Typography>
      </MenuItem>
    </Elevator>
  );
}
