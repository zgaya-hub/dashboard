import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Fade, Popover, Stack, SxProps, Typography } from "@mui/material";
import { format } from "date-fns";
import FinancialInfoCreatePopper from "./FinancialInfoCreatePopper";

import { AddIcon, CachedIcon, EditIcon, ErrorIcon, SaveIcon } from "@/components/icons";
import { DEFAULT_DATE_FORMAT } from "@/mock/constants";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { handleOnTruncateText } from "@/utils";

import { useGetSeriesDetailsById, useUpdateSeries } from "../../hooks";

import SeriesDetailsCardSkeleton from "./Skeleton";
import Button from "@/components/Button";
import SeriesDetailsEditForm from "./SeriesDetailsEditForm";
import { GetSeriesDetailsByIdOutput } from "zgaya.hub-client-types/lib";
import { SeriesDetailsErrorCard } from "..";

interface SeriesDetailsCardProps {
  seriesId: string;
}

export default function SeriesDetailsCard({ seriesId }: SeriesDetailsCardProps) {
  const { t } = useTranslation();
  const { CountryChanger, GenreChanger, LanguageChanger, StatusChanger, formState, reset: formReset, TextField, DateChanger, PriceChanger, watch: watchFormValue, handleSubmit: handleSubmitForm } = SeriesDetailsEditForm();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [financialInfoCreateMolalAnchorEl, setFinancialInfoCreateMolalAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [editableField, setEditableField] = useState<string | null>(null);
  const { mutateAsync: updateSeriesMutateAsync, isPending: isUpdateSeriesLoading } = useUpdateSeries();
  const { data: seriesDetailsData, refetch: seriesDetailsRefetch, isLoading: isSeriesDetailsLoading, error: seriesDetailsError } = useGetSeriesDetailsById({ SeriesId: seriesId });

  const handleOnSave = async (input: GetSeriesDetailsByIdOutput) => {
    await updateSeriesMutateAsync(
      { SeriesId: seriesDetailsData.ID },
      {
        AdditionalInfo: {
          Genre: input.genre,
          Status: input.status,
          OriginalLanguage: input.originalLanguage,
          OriginCountry: input.originCountry,
        },
        ReleaseDate: input.releaseDate ? +input.releaseDate : undefined,
        Title: input.title,
        PlotSummary: input.plotSummary,
        Image: {
          Url: input.imageUrl,
        },
        FinancialInfo: {
          Budget: +input.budget,
          NetProfit: +input.netProfit,
          Revenue: +input.revenue,
        },
      }
    );
  };

  const handleOnCancel = () => {
    formReset();
  };

  const cardStyle: SxProps = {
    position: "relative",
  };

  const cardMediaStyle = useThemeStyles<SxProps>((theme) => ({
    minHeight: theme.spacing(32),
    backgroundSize: "cover",
  }));

  const editIconStyle = useThemeStyles<SxProps>((theme) => ({
    position: "absolute",
    right: theme.spacing(0),
    background: theme.palette.background.default,
  }));

  if (isSeriesDetailsLoading) {
    return <SeriesDetailsCardSkeleton />;
  }

  if (seriesDetailsError) {
    return <SeriesDetailsErrorCard errorMessage={seriesDetailsError.message} onRefetch={() => seriesDetailsRefetch()} />;
    // error.message
  }

  const renderEditableText = (label: string, value: string | number, popoverField: ReactNode) => (
    <Stack direction="row" justifyContent="space-between" p={1} alignItems="end" onMouseEnter={() => setEditableField(label)} onMouseLeave={() => setEditableField(null)} position="relative">
      <Typography variant="h6">{label}</Typography>
      <Typography>
        {value}
        {editableField === label ? (
          <>
            <EditIcon fontSize="inherit" sx={editIconStyle} onClick={(event) => setAnchorEl(event.currentTarget)} iconButton={false} tooltip="Edit" />
            <Popover
              open={!!anchorEl}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorReference="anchorEl"
              transformOrigin={{
                horizontal: "right",
                vertical: "top",
              }}
              anchorOrigin={{
                horizontal: "left",
                vertical: "top",
              }}
            >
              <Stack p={1}>{popoverField}</Stack>
            </Popover>
          </>
        ) : null}
      </Typography>
    </Stack>
  );

  return (
    <Card sx={cardStyle}>
      <CardHeader action={<CachedIcon onClick={() => seriesDetailsRefetch()} />} />

      <CardMedia sx={cardMediaStyle} image={seriesDetailsData?.imageUrl} />

      <CardContent>
        <Typography variant="h5" py={1}>
          {t("Feature.Series.SeriesDetailsCard.seriesDetails")}
        </Typography>
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.title"), watchFormValue("title") ?? seriesDetailsData?.title, <TextField name="title" label={t("Feature.Series.SeriesDetailsCard.title")} defaultValue={seriesDetailsData?.title} />)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.plotSummary"), handleOnTruncateText(watchFormValue("plotSummary") ?? (seriesDetailsData?.plotSummary || ""), 20), <TextField name="title" label={t("Feature.Series.SeriesDetailsCard.plotSummary")} defaultValue={seriesDetailsData?.plotSummary} />)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.releaseDate"), watchFormValue("releaseDate") ?? format(seriesDetailsData?.releaseDate || 0, DEFAULT_DATE_FORMAT), <DateChanger name="releaseDate" label={t("Feature.Series.SeriesDetailsCard.releaseDate")} defaultValue={seriesDetailsData?.releaseDate || 0} />)}
        <Typography variant="h5" py={1}>
          {t("Feature.Series.SeriesDetailsCard.additionalInfo")}
        </Typography>
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.genre"), watchFormValue("genre") ?? (seriesDetailsData?.genre || ""), <GenreChanger label={t("Feature.Series.SeriesDetailsCard.genre")} defaultValue={seriesDetailsData?.genre} />)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.originCountry"), watchFormValue("originCountry") ?? (seriesDetailsData?.originCountry || ""), <CountryChanger label={t("Feature.Series.SeriesDetailsCard.originCountry")} defaultValue={seriesDetailsData?.originCountry} />)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.originalLanguage"), watchFormValue("originalLanguage") ?? (seriesDetailsData?.originalLanguage || ""), <LanguageChanger label={t("Feature.Series.SeriesDetailsCard.originalLanguage")} defaultValue={seriesDetailsData?.originalLanguage} />)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.status"), watchFormValue("status") ?? (seriesDetailsData?.status || ""), <StatusChanger label={t("Feature.Series.SeriesDetailsCard.status")} defaultValue={seriesDetailsData?.status} />)}

        <Stack direction={"row"} justifyContent={"space-between"} py={1}>
          <Typography variant="h5">{t("Feature.Series.SeriesDetailsCard.financialInfo")}</Typography>
          {!seriesDetailsData?.netProfit && seriesDetailsData?.netProfit !== 0 ? (
            <Button endIcon={<AddIcon />} onClick={(e) => setFinancialInfoCreateMolalAnchorEl(e.currentTarget)}>
              {t("Feature.Series.SeriesDetailsCard.add")}
            </Button>
          ) : null}
          <FinancialInfoCreatePopper onSuccess={() => seriesDetailsRefetch()} seriesId={seriesId} anchorEl={financialInfoCreateMolalAnchorEl} onClose={() => setFinancialInfoCreateMolalAnchorEl(null)} />
        </Stack>
        {seriesDetailsData?.netProfit || seriesDetailsData?.netProfit === 0 ? (
          <>
            {renderEditableText(t("Feature.Series.SeriesDetailsCard.netProfit"), `${watchFormValue("netProfit") ?? seriesDetailsData?.netProfit ?? 0} $`, <PriceChanger name="netProfit" label={t("Feature.Series.SeriesDetailsCard.netProfit")} defaultValue={seriesDetailsData?.netProfit ?? 0} />)}
            {renderEditableText(t("Feature.Series.SeriesDetailsCard.revenue"), `${watchFormValue("revenue") ?? seriesDetailsData?.revenue ?? 0} $`, <PriceChanger name="revenue" label={t("Feature.Series.SeriesDetailsCard.revenue")} defaultValue={seriesDetailsData?.revenue ?? 0} />)}
            {renderEditableText(t("Feature.Series.SeriesDetailsCard.budget"), `${watchFormValue("budget") ?? seriesDetailsData?.budget ?? 0} $`, <PriceChanger name="budget" label={t("Feature.Series.SeriesDetailsCard.budget")} defaultValue={seriesDetailsData?.budget ?? 0} />)}
          </>
        ) : null}
      </CardContent>

      <Fade appear={false} in={!!formState.isDirty}>
        <CardActions>
          <Box flex={"1 0 0"} />
          <Button onClick={handleOnCancel} variant="text">
            {t("Feature.Series.SeriesDetailsCard.cancel")}
          </Button>
          <Button onClick={handleSubmitForm(handleOnSave)} loading={isUpdateSeriesLoading} variant="contained" endIcon={<SaveIcon />}>
            {t("Feature.Series.SeriesDetailsCard.save")}
          </Button>
        </CardActions>
      </Fade>
    </Card>
  );
}
