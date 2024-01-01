import { Card, CardContent, CardMedia, Skeleton, Stack, SxProps, Typography } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { useTranslation } from "react-i18next";

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
      <CardMedia sx={cardStyle} />
      <CardContent>
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.title"))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.releaseDate"))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.genre"))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.originCountry"))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.originalLanguage"))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.status"))}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.plotSummary"))}
      </CardContent>
    </Card>
  );
}
