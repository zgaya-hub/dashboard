import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardMedia, Stack, SxProps, Typography } from "@mui/material";
import { format } from "date-fns";

import { CachedIcon } from "@/components/icons";
import { DEFAULT_DATE_FORMAT } from "@/mock/constants";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { handleOnTruncateText } from "@/utils";

import { useGetMovieDetailsById } from "../hooks";

import { MovieDetailsCardSkeleton, MovieStatusChip } from ".";
import { ErrorCard } from "@/components/Cards";
import { ReactNode } from "react";

interface MovieDetailsCardProps {
  movieId: string;
}

export default function MovieDetailsCard({ movieId }: MovieDetailsCardProps) {
  const { t } = useTranslation();
  const { data: movieDetailsData, refetch: movieDetailsRefetch, isLoading: isMovieDetailsLoading, error: movieDetailsError } = useGetMovieDetailsById({ MovieId: movieId });

  const cardStyle: SxProps = {
    position: "relative",
  };

  const cardMediaStyle = useThemeStyles<SxProps>((theme) => ({
    minHeight: theme.spacing(32),
    backgroundSize: "cover",
  }));

  if (isMovieDetailsLoading) {
    return <MovieDetailsCardSkeleton />;
  }

  if (movieDetailsError) {
    return <ErrorCard errorMessage={movieDetailsError.message} action={<CachedIcon onClick={() => movieDetailsRefetch()} />} />;
  }

  const renderEditableText = (label: string, value: ReactNode) => (
    <Stack direction="row" justifyContent="space-between" p={1} alignItems="end">
      <Typography variant="h6">{label}</Typography>
      {value}
    </Stack>
  );

  return (
    <Card sx={cardStyle}>
      <CardHeader action={<CachedIcon onClick={() => movieDetailsRefetch()} tooltip={t("Feature.Movie.MovieDetailsCard.refetch")} />} />

      <CardMedia sx={cardMediaStyle} image={movieDetailsData?.thumbnailUrl} />

      <CardContent>
        <Typography variant="h5" py={1}>
          {t("Feature.Movie.MovieDetailsCard.movieDetails")}
        </Typography>
        {renderEditableText(t("Feature.Movie.MovieDetailsCard.title"), movieDetailsData?.title)}
        {renderEditableText(t("Feature.Movie.MovieDetailsCard.plotSummary"), handleOnTruncateText(movieDetailsData?.plotSummary ?? "", 20))}
        {renderEditableText(t("Feature.Movie.MovieDetailsCard.releaseDate"), format(movieDetailsData?.releaseDate ?? new Date(), DEFAULT_DATE_FORMAT))}

        <Typography variant="h5" py={1}>
          {t("Feature.Movie.MovieDetailsCard.additionalInfo")}
        </Typography>
        {renderEditableText(t("Feature.Movie.MovieDetailsCard.genre"), movieDetailsData?.genre)}
        {renderEditableText(t("Feature.Movie.MovieDetailsCard.status"), <MovieStatusChip status={movieDetailsData?.status} />)}
        {renderEditableText(t("Feature.Movie.MovieDetailsCard.originCountry"), movieDetailsData?.originCountry)}
        {renderEditableText(t("Feature.Movie.MovieDetailsCard.originalLanguage"), movieDetailsData?.originalLanguage)}
      </CardContent>
    </Card>
  );
}
