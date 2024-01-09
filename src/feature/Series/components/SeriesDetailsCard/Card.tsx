import { ReactNode } from "react";
import { Card, CardContent, CardMedia, Stack, SxProps, Typography } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { DEFAULT_DATE_FORMAT } from "@/mock/constants";
import { handleOnTruncateText } from "@/utils";
import { useGetMediaAdditionalInfoByMediaId, useGetMediaBasicInfoByMediaId, useGetImageByMediaId } from "../../hooks";
import SeriesDetailsCardSkeleton from "./Skeleton";
import { CachedIcon, ErrorIcon, InfoIcon } from "@/components/icons";

interface SeriesDetailsCardProps {
  seriesId: string;
}

export default function SeriesDetailsCard({ seriesId }: SeriesDetailsCardProps) {
  const { t } = useTranslation();
  const { data: imageData, refetch: imageRefetch, isLoading: isImageLoading, error: getImageByMediaIdError } = useGetImageByMediaId({ MediaId: seriesId });
  const { data: mediaAdditionalInfoData, refetch: mediaAdditionalInfoRefetch, isLoading: isMediaAdditionalInfoLoading } = useGetMediaAdditionalInfoByMediaId({ MediaId: seriesId });
  const { data: mediaBasicInfoData, refetch: mediaBasicInfoRefetch, isLoading: isMediaBasicInfoLoading } = useGetMediaBasicInfoByMediaId({ MediaId: seriesId });

  const handleOnRefetch = () => {
    mediaAdditionalInfoRefetch();
    mediaBasicInfoRefetch();
    imageRefetch();
  };

  const cardStyle: SxProps = {
    position: "relative",
  };

  const cardMediaStyle = useThemeStyles<SxProps>((theme) => ({
    minHeight: theme.spacing(32),
    backgroundSize: "cover",
  }));

  const errorIconStyle = useThemeStyles<SxProps>((theme) => ({
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  }));

  const refreshIconStyle = useThemeStyles<SxProps>((theme) => ({
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(6),
  }));

  if (isImageLoading || isMediaBasicInfoLoading || isMediaAdditionalInfoLoading) {
    return <SeriesDetailsCardSkeleton />;
  }

  const renderEditableText = (label: string, value: string, icon?: ReactNode) => (
    <Stack direction={"row"} justifyContent={"space-between"} p={1}>
      <Typography variant="h6">{label}</Typography>
      <Typography>
        {value} {icon}
      </Typography>
    </Stack>
  );

  return (
    <Card sx={cardStyle}>
      <CardMedia sx={cardMediaStyle} image={imageData?.url} />
      {getImageByMediaIdError ? <CachedIcon sx={refreshIconStyle} onClick={handleOnRefetch} /> : null}
      {getImageByMediaIdError ? <ErrorIcon color="error" sx={errorIconStyle} iconButton tooltip={getImageByMediaIdError.message} /> : null}
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
