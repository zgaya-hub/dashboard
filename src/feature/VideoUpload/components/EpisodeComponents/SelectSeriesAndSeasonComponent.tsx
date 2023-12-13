import { Card, CardHeader, List, ListItem, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import SelectSeriesCard from "./SelectSeriesCard/SelectSeriesCard";
import { useGetManagerSeriesWithImageAndBasicInfo } from "../../hooks/queryHooks";
import { useState } from "react";
import { GetManagerSeriesWithImageAndBasicInfo } from "../../hooks/queryHooks.types";
import { useTranslation } from "react-i18next";
import { AddIcon, ChevronLeftIcon } from "@/components/icons";
import Button from "@/components/Button";

interface SelectSeriesAndSeasonComponentProps {}

export default function SelectSeriesAndSeasonComponent({}: SelectSeriesAndSeasonComponentProps) {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<GetManagerSeriesWithImageAndBasicInfo | null>(null);
  const { data: managerSeriesWithImageAndBasicInfo = [] } = useGetManagerSeriesWithImageAndBasicInfo();

  const listContainerStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(50),
    position: "relative",
  }));

  const listStyle = useThemeStyles<SxProps>((theme) => ({
    maxHeight: theme.spacing(70), // Adjust the maximum height as needed
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none", // Webkit (Chrome, Safari)
    },
  }));

  const renderItem = () => {
    if (selectedItem) {
      return (
        <Card sx={listContainerStyle}>
          <CardHeader
            avatar={<ChevronLeftIcon onClick={() => setSelectedItem(null)} />}
            action={
              <Button  variant="contained">
                <AddIcon />
              </Button>
            }
            titleTypographyProps={{
              variant: "subtitle1",
            }}
            title={selectedItem.mediaBasicInfo.mediaTitle}
          />
        </Card>
      );
    } else {
      return (
        <Card sx={listContainerStyle}>
          <CardHeader
            title={t("Feature.VideoUpload.SeriesSelectComponent.title")}
            titleTypographyProps={{
              variant: "subtitle1",
            }}
          />
          <List sx={listStyle}>
            {managerSeriesWithImageAndBasicInfo.map((series) => (
              <ListItem key={series.ID} onClick={() => setSelectedItem(series)}>
                <SelectSeriesCard isLoading={false} thumbnail={"https://images.nightcafe.studio//assets/tdraw-girl.jpg?tr=w-1200,c-at_max"} title={series.mediaBasicInfo.mediaTitle} />
              </ListItem>
            ))}
          </List>
        </Card>
      );
    }
  };

  return renderItem();
}
