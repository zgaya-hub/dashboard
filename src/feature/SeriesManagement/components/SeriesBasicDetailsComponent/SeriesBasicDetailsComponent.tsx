import React from "react";
import { useGetMediaBasicInfoByMediaId } from "../../hooks/queryHooks";
import { Elevator } from "@/components/Tags";
import { ListItem, MenuItem, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import SeriesBasicDetailsComponentSkeleton from "./SeriesBasicDetailsComponentSkeleton";

interface SeriesBasicDetailsComponentProps {
  seriesId: string;
}

export default function SeriesBasicDetailsComponent({ seriesId }: SeriesBasicDetailsComponentProps) {
  const { t } = useTranslation();
  const { isLoading, data } = useGetMediaBasicInfoByMediaId({ MediaId: seriesId });

  /*  if (isLoading) {
    return <SeriesBasicDetailsComponentSkeleton />;
  }
 */
  return (
    <Elevator>
      <MenuItem>
        <Typography>{t("Feature.SeriesManagement.SeriesBasicDetailsComponent.title")}</Typography>
        {data?.title}
      </MenuItem>
      <MenuItem>
        <Typography>{t("Feature.SeriesManagement.SeriesBasicDetailsComponent.plotSummary")}</Typography>
        {data?.plotSummary}
      </MenuItem>
      <MenuItem>
        <Typography>{t("Feature.SeriesManagement.SeriesBasicDetailsComponent.releaseDate")}</Typography>
        {data?.releaseDate}
      </MenuItem>
    </Elevator>
  );
}
