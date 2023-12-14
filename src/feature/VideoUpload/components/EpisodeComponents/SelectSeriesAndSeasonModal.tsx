import { Card, DialogActions, Divider, List, ListItem, Paper, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { useGetManagerSeriesWithImageAndBasicInfo, useGetSeasonBySeriesId } from "../../hooks/queryHooks";
import { useState } from "react";
import { GetManagerSeriesWithImageAndBasicInfo, GetSeasonBySeriesIdOutput } from "../../hooks/queryHooks.types";
import { useTranslation } from "react-i18next";
import { AddIcon, ChevronLeftIcon, UploadIcon } from "@/components/icons";
import { Dialog } from "@/components/Dialog";
import Button from "@/components/Button";
import useNavigation from "@/navigation/use-navigation";
import { ImagePlusTitleCard } from "@/components/Cards";

interface SelectSeriesAndSeasonModalProps {
  isVisible: boolean;
}

export default function SelectSeriesAndSeasonModal({ isVisible }: SelectSeriesAndSeasonModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const [selectedSeries, setSelectedSeries] = useState<GetManagerSeriesWithImageAndBasicInfo | null>(null);
  const [selectedSeriesSeasons, setSelectedSeriesSeasons] = useState<GetSeasonBySeriesIdOutput | null>(null);
  const { data: managerSeriesWithImageAndBasicInfo = [] } = useGetManagerSeriesWithImageAndBasicInfo();
  const { mutateAsync: GetSeasonBySeriesIdMutateAsync } = useGetSeasonBySeriesId();

  const handleOnClickSeries = async (series: GetManagerSeriesWithImageAndBasicInfo) => {
    const result = await GetSeasonBySeriesIdMutateAsync({ SeriesId: series.ID });
    setSelectedSeriesSeasons(result.getUploadVideoSignedUrl);
    setSelectedSeries(series);
  };

  const handleOnMovie = () => {
    navigate.navigate("/video-upload/movie");
  };

  const handleOnTrailer = () => {
    navigate.navigate("/video-upload/trailer");
  };

  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(48),
    position: "relative",
    boxShadow: "none",
  }));

  const listStyle = useThemeStyles<SxProps>((theme) => ({
    maxHeight: theme.spacing(96),
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  }));

  const seasonList = (
    <Card sx={cardStyle}>
      <List sx={listStyle}>
        {managerSeriesWithImageAndBasicInfo.map((series) => (
          <ListItem key={series.ID} onClick={() => handleOnClickSeries(series)}>
            <ImagePlusTitleCard thumbnail={"https://vsthemes.org/uploads/posts/workshop/286338453763faafe7751aa978304580.webp"} title={series.mediaBasicInfo.mediaTitle} />
          </ListItem>
        ))}
      </List>
    </Card>
  );

  const seasonListFooter = (
    <DialogActions>
      <ChevronLeftIcon onClick={() => setSelectedSeries(null)} />
      <AddIcon onClick={() => {}} />
    </DialogActions>
  );

  const seriesList = (
    <Card sx={cardStyle}>
      <List sx={listStyle}>
        {managerSeriesWithImageAndBasicInfo.map((series) => (
          <ListItem key={series.ID} onClick={() => handleOnClickSeries(series)}>
            <ImagePlusTitleCard thumbnail={"https://vsthemes.org/uploads/posts/workshop/286338453763faafe7751aa978304580.webp"} title={series.mediaBasicInfo.mediaTitle} />
          </ListItem>
        ))}
      </List>
    </Card>
  );

  const seriesListFooter = (
    <DialogActions>
      <AddIcon onClick={() => {}} />
      <Button variant="outlined" onClick={handleOnMovie} startIcon={<UploadIcon />}>
        Movie
      </Button>
      <Button variant="outlined" onClick={handleOnTrailer} startIcon={<UploadIcon />}>
        Trailer
      </Button>
    </DialogActions>
  );

  return (
    <Dialog isDraggable onClose={() => setSelectedSeries(null)} headerText={selectedSeries ? selectedSeries.mediaBasicInfo.mediaTitle : t("Feature.VideoUpload.SeriesSelectComponent.title")} hideCrossButton open={isVisible}>
      {selectedSeries ? seasonList : seriesList}
      {selectedSeries ? seasonListFooter : seriesListFooter}
    </Dialog>
  );
}
