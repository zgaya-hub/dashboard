import { ReactNode } from "react";
import { Card, CardContent, CardMedia, Stack, SxProps, Typography } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { DEFAULT_DATE_FORMAT } from "@/mock/constants";
import { handleOnTruncateText } from "@/utils";
import { useGetMediaAdditionalInfoByMediaId, useGetMediaBasicInfoByMediaId, useGetMediaImageByMediaId } from "../../hooks";
import SeriesDetailsCardSkeleton from "./SeriesDetailsCardSkeleton";
import { InfoIcon } from "@/components/icons";

interface SeriesDetailsCardProps {
  seriesId: string;
}

export default function SeriesDetailsCard({ seriesId }: SeriesDetailsCardProps) {
  const { t } = useTranslation();
  const { data: mediaImageData, isLoading: isMediaImageLoading } = useGetMediaImageByMediaId({ MediaId: seriesId });
  const { data: mediaAdditionalInfoData, isLoading: isMediaAdditionalInfoLoading } = useGetMediaAdditionalInfoByMediaId({ MediaId: seriesId });
  const { data: mediaBasicInfoData, isLoading: isMediaBasicInfoLoading } = useGetMediaBasicInfoByMediaId({ MediaId: seriesId });

  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    minHeight: theme.spacing(32),
    backgroundSize: "cover",
  }));

  if (isMediaImageLoading || isMediaBasicInfoLoading || isMediaAdditionalInfoLoading) {
    return <SeriesDetailsCardSkeleton />;
  }

  const renderEditableText = (label: string, value: string, icon?: ReactNode) => (
    <Stack direction={"row"} justifyContent={"space-between"} p={1}>
      <Typography variant="h6">{label}</Typography>
      <Typography sx={{ position: "relative" }}>
        {value} {icon}
      </Typography>
    </Stack>
  );

  return (
    <Card>
      <CardMedia sx={cardStyle} image={mediaImageData?.url} />
      <CardContent>
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.title"), mediaBasicInfoData?.title || "")}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.releaseDate"), format(mediaBasicInfoData?.releaseDate || 0, DEFAULT_DATE_FORMAT))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.genre"), mediaAdditionalInfoData?.genre || "")}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.originCountry"), mediaAdditionalInfoData?.originCountry || "")}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.originalLanguage"), mediaAdditionalInfoData?.originalLanguage || "")}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.status"), mediaAdditionalInfoData?.status || "")}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.plotSummary"), handleOnTruncateText(mediaBasicInfoData?.plotSummary || "", 20), <InfoIcon fontSize="inherit" className="edit-icon" tooltip={mediaBasicInfoData?.plotSummary} />)}
      </CardContent>
    </Card>
  );
}
