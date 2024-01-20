import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardMedia, Stack, SxProps, Typography } from "@mui/material";
import { format } from "date-fns";

import { CachedIcon } from "@/components/icons";
import { DEFAULT_DATE_FORMAT } from "@/mock/constants";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { handleOnFormatPrice, handleOnTruncateText } from "@/utils";

import { useGetSeriesDetailsById } from "../hooks";

import { SeriesDetailsCardSkeleton } from ".";
import { ErrorCard } from "@/components/Cards";

interface SeriesDetailsCardProps {
  seriesId: string;
}

export default function SeriesDetailsCard({ seriesId }: SeriesDetailsCardProps) {
  const { t } = useTranslation();
  const { data: seriesDetailsData, refetch: seriesDetailsRefetch, isLoading: isSeriesDetailsLoading, error: seriesDetailsError } = useGetSeriesDetailsById({ SeriesId: seriesId });

  const cardStyle: SxProps = {
    position: "relative",
  };

  const cardMediaStyle = useThemeStyles<SxProps>((theme) => ({
    minHeight: theme.spacing(32),
    backgroundSize: "cover",
  }));

  if (isSeriesDetailsLoading) {
    return <SeriesDetailsCardSkeleton />;
  }

  if (seriesDetailsError) {
    return <ErrorCard errorMessage={seriesDetailsError.message} action={<CachedIcon onClick={() => seriesDetailsRefetch()} />} />;
  }

  const renderEditableText = (label: string, value: string | number) => (
    <Stack direction="row" justifyContent="space-between" p={1} alignItems="end">
      <Typography variant="h6">{label}</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );

  return (
    <Card sx={cardStyle}>
      <CardHeader action={<CachedIcon onClick={() => seriesDetailsRefetch()} />} />

      <CardMedia sx={cardMediaStyle} image={seriesDetailsData?.backdropImageUrl} />

      <CardContent>
        <Typography variant="h5" py={1}>
          {t("Feature.Series.SeriesDetailsCard.seriesDetails")}
        </Typography>
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.title"), seriesDetailsData?.title)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.plotSummary"), handleOnTruncateText(seriesDetailsData?.plotSummary ?? "", 20))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.releaseDate"), format(seriesDetailsData?.releaseDate ?? new Date(), DEFAULT_DATE_FORMAT))}

        <Typography variant="h5" py={1}>
          {t("Feature.Series.SeriesDetailsCard.additionalInfo")}
        </Typography>
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.genre"), seriesDetailsData?.genre)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.status"), seriesDetailsData?.status)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.originCountry"), seriesDetailsData?.originCountry)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.originalLanguage"), seriesDetailsData?.originalLanguage)}

        <Typography variant="h5" py={1}>{t("Feature.Series.SeriesDetailsCard.financialInfo")}</Typography>
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.netProfit"), `${handleOnFormatPrice(seriesDetailsData?.netProfit)} $`)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.revenue"), `${handleOnFormatPrice(seriesDetailsData?.revenue)} $`)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.budget"), `${handleOnFormatPrice(seriesDetailsData?.budget)} $`)}
      </CardContent>
    </Card>
  );
}
