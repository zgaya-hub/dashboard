import { Card, DialogActions, Divider, List, ListItem, Paper, Stack, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import SelectSeriesCard from "./SelectSeriesCard/SelectSeriesCard";
import { useGetManagerSeriesWithImageAndBasicInfo } from "../../hooks/queryHooks";
import { useState } from "react";
import { GetManagerSeriesWithImageAndBasicInfo } from "../../hooks/queryHooks.types";
import { useTranslation } from "react-i18next";
import { AddIcon, ChevronLeftIcon, UploadIcon } from "@/components/icons";
import { Dialog } from "@/components/Dialog";
import Button from "@/components/Button";
import useNavigation from "@/navigation/use-navigation";

interface SelectSeriesAndSeasonModalProps {
  isVisible: boolean;
}

export default function SelectSeriesAndSeasonModal({ isVisible }: SelectSeriesAndSeasonModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const [selectedItem, setSelectedItem] = useState<GetManagerSeriesWithImageAndBasicInfo | null>(null);
  const { data: managerSeriesWithImageAndBasicInfo = [] } = useGetManagerSeriesWithImageAndBasicInfo();

  const handleOnMovie = () => {
    navigate.navigate("/video-upload/movie");
  };

  const handleOnTrailer = () => {
    navigate.navigate("/video-upload/trailer");
  };

  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.sizing.xlarge(theme),
    position: "relative",
    boxShadow: "none",
  }));

  const listStyle = useThemeStyles<SxProps>((theme) => ({
    maxHeight: theme.spacing(70),
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  }));

  const seasonList = (
    <Paper sx={cardStyle}>
      <Card sx={cardStyle}></Card>
    </Paper>
  );

  const seasonListFooter = (
    <DialogActions>
      <ChevronLeftIcon onClick={() => setSelectedItem(null)} />
      <AddIcon onClick={() => {}} />
    </DialogActions>
  );

  const seriesList = (
    <Card sx={cardStyle}>
      <List sx={listStyle}>
        {managerSeriesWithImageAndBasicInfo.map((series) => (
          <ListItem key={series.ID} onClick={() => setSelectedItem(series)}>
            <SelectSeriesCard isLoading={false} thumbnail={"https://thefridaytimes.com/digital_images/large/2022-08-01/what-would-be-different-if-imran-khan-returns-to-power-1687413390-6199.jpg"} title={series.mediaBasicInfo.mediaTitle} />
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
    <Dialog onClose={() => setSelectedItem(null)} headerText={selectedItem ? selectedItem.mediaBasicInfo.mediaTitle : t("Feature.VideoUpload.SeriesSelectComponent.title")} hideCrossButton open={isVisible}>
      <Divider />
      {selectedItem ? seasonList : seriesList}
      <Divider />
      {selectedItem ? seasonListFooter : seriesListFooter}
    </Dialog>
  );
}
