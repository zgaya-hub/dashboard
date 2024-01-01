import Page from "@/components/Page";
import { Card, CardContent, CardMedia, Grid, Skeleton, Stack, SxProps, Typography } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { useTranslation } from "react-i18next";

export default function SeriesDetailsCardSkeleton() {
  const { t } = useTranslation();

  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    minHeight: theme.spacing(48),
    backgroundSize: "contain",
  }));

  const textSkeletonWidth = useThemeStyles<string>((theme) => theme.spacing(24));

  return (
    <Page>
      <Grid container justifyContent={"space-between"} rowGap={4}>
        <Card sx={cardStyle}>
          <CardMedia />
          <CardContent>
            <Stack direction={"row"} justifyContent={"space-between"} p={1}>
              <Typography variant="h6">{t("Feature.Series.SeriesDetailsCard.title")}</Typography>
              <Skeleton width={textSkeletonWidth}></Skeleton>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} p={1}>
              <Typography variant="h6">{t("Feature.Series.SeriesDetailsCard.releaseDate")}</Typography>
              <Skeleton width={textSkeletonWidth}></Skeleton>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} p={1}>
              <Typography variant="h6">{t("Feature.Series.SeriesDetailsCard.genre")}</Typography>
              <Skeleton width={textSkeletonWidth}></Skeleton>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} p={1}>
              <Typography variant="h6">{t("Feature.Series.SeriesDetailsCard.originCountry")}</Typography>
              <Skeleton width={textSkeletonWidth}></Skeleton>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} p={1}>
              <Typography variant="h6">{t("Feature.Series.SeriesDetailsCard.originalLanguage")}</Typography>
              <Skeleton width={textSkeletonWidth}></Skeleton>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} p={1}>
              <Typography variant="h6">{t("Feature.Series.SeriesDetailsCard.status")}</Typography>
              <Skeleton width={textSkeletonWidth}></Skeleton>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} p={1}>
              <Typography variant="h6">{t("Feature.Series.SeriesDetailsCard.plotSummary")}</Typography>
              <Skeleton width={textSkeletonWidth}></Skeleton>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Page>
  );
}
