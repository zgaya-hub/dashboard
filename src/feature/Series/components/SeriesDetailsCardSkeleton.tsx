import { Card, CardContent, CardHeader, Skeleton, Stack, SxProps, Typography } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { useTranslation } from "react-i18next";
import { CachedIcon } from "@/components/icons";

export default function SeriesDetailsCardSkeleton() {
  const { t } = useTranslation();

  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    minHeight: theme.spacing(32),
  }));

  const textSkeletonWidth = useThemeStyles<string>((theme) => theme.spacing(24));

  const renderEditableText = (label: string) => (
    <Stack direction={"row"} justifyContent={"space-between"} p={1}>
      <Typography variant="h6">{label}</Typography>
      <Skeleton width={textSkeletonWidth}></Skeleton>
    </Stack>
  );

  return (
    <Card>
      <CardHeader action={<CachedIcon iconButton disabled />} />
      <Skeleton sx={cardStyle} variant="rectangular" />
      <CardContent>
        <Typography variant="h5" py={1}>
          {t("Feature.Series.SeriesDetailsCard.seriesDetails")}
        </Typography>
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.title"))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.plotSummary"))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.releaseDate"))}
        <Typography variant="h5" py={1}>
          {t("Feature.Series.SeriesDetailsCard.additionalInfo")}
        </Typography>
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.genre"))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.status"))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.originCountry"))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.originalLanguage"))}
        <Typography variant="h5" py={1}>{t("Feature.Series.SeriesDetailsCard.financialInfo")}</Typography>
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.netProfit"))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.revenue"))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.budget"))}
      </CardContent>
    </Card>
  );
}
