import { Card, CardContent, CardHeader, Skeleton, Stack, SxProps, Typography } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { useTranslation } from "react-i18next";
import { CachedIcon } from "@/components/icons";

export default function MovieDetailsCardSkeleton() {
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
          {t("Feature.Movie.MovieDetailsCard.movieDetails")}
        </Typography>
        {renderEditableText(t("Feature.Movie.MovieDetailsCard.title"))}
        {renderEditableText(t("Feature.Movie.MovieDetailsCard.plotSummary"))}
        {renderEditableText(t("Feature.Movie.MovieDetailsCard.releaseDate"))}
        <Typography variant="h5" py={1}>
          {t("Feature.Movie.MovieDetailsCard.additionalInfo")}
        </Typography>
        {renderEditableText(t("Feature.Movie.MovieDetailsCard.genre"))}
        {renderEditableText(t("Feature.Movie.MovieDetailsCard.status"))}
        {renderEditableText(t("Feature.Movie.MovieDetailsCard.originCountry"))}
        {renderEditableText(t("Feature.Movie.MovieDetailsCard.originalLanguage"))}
      </CardContent>
    </Card>
  );
}
