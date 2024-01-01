import Page from "@/components/Page";
import { Badge, Card, CardContent, CardMedia, Grid, Stack, SxProps, Typography } from "@mui/material";
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
    minHeight: theme.spacing(24),
    backgroundSize: "cover",
  }));

  if (isMediaImageLoading || isMediaBasicInfoLoading || isMediaAdditionalInfoLoading) {
    return <SeriesDetailsCardSkeleton />;
  }

  return (
    <Card sx={cardStyle}>
      <CardMedia sx={cardStyle} image={mediaImageData?.url} />
      <CardContent>
        <Stack direction={"row"} justifyContent={"space-between"} p={1}>
          <Typography variant="h6">{t("Feature.SeriesManagement.SeriesDetailsCard.title")}</Typography>
          <Typography>{mediaBasicInfoData?.title}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} p={1}>
          <Typography variant="h6">{t("Feature.SeriesManagement.SeriesDetailsCard.releaseDate")}</Typography>
          <Typography>{format(mediaBasicInfoData?.releaseDate ?? 0, DEFAULT_DATE_FORMAT)}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} p={1}>
          <Typography variant="h6">{t("Feature.SeriesManagement.SeriesDetailsCard.genre")}</Typography>
          <Typography>{mediaAdditionalInfoData?.genre}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} p={1}>
          <Typography variant="h6">{t("Feature.SeriesManagement.SeriesDetailsCard.originCountry")}</Typography>
          <Typography>{mediaAdditionalInfoData?.originCountry}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} p={1}>
          <Typography variant="h6">{t("Feature.SeriesManagement.SeriesDetailsCard.originalLanguage")}</Typography>
          <Typography>{mediaAdditionalInfoData?.originalLanguage}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} p={1}>
          <Typography variant="h6">{t("Feature.SeriesManagement.SeriesDetailsCard.status")}</Typography>
          <Typography>{mediaAdditionalInfoData?.status}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} p={1}>
          <Typography variant="h6">{t("Feature.SeriesManagement.SeriesDetailsCard.plotSummary")}</Typography>
          <Typography>
            {handleOnTruncateText(mediaBasicInfoData?.plotSummary ?? "", 20)}
            <InfoIcon fontSize="inherit" tooltip={mediaBasicInfoData?.plotSummary} />
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
