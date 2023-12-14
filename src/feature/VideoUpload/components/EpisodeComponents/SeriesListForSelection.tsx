import { ImagePlusTitleCard, ImagePlusTitleCardSkeleton } from "@/components/Cards";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Card, List, ListItem, SxProps } from "@mui/material";
import { GetManagerSeriesWithImageAndBasicInfoOutput } from "../../hooks/queryHooks.types";

interface SeriesListForSelectionProps {
  seriesList: GetManagerSeriesWithImageAndBasicInfoOutput[];
  onSelectedSeries: (series: GetManagerSeriesWithImageAndBasicInfoOutput) => void;
  isLoading: boolean;
}

export default function SeriesListForSelection({ seriesList, onSelectedSeries, isLoading }: SeriesListForSelectionProps) {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(48),
    position: "relative",
    boxShadow: "none",
  }));

  const listStyle = useThemeStyles<SxProps>((theme) => ({
    maxHeight: theme.spacing(96),
    overflowY: "auto",
  }));

  if (isLoading) {
    return (
      <Card sx={cardStyle}>
        <List sx={listStyle}>
          {["", "", ""].map(() => (
            <ListItem>
              <ImagePlusTitleCardSkeleton />
            </ListItem>
          ))}
        </List>
      </Card>
    );
  }

  return (
    <Card sx={cardStyle}>
      <List sx={listStyle}>
        {seriesList.map((series) => (
          <ListItem key={series.ID} onClick={() => onSelectedSeries(series)}>
            <ImagePlusTitleCard thumbnail={series.mediaImage[0].mediaImageUrl} title={series.mediaBasicInfo.mediaTitle} />
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
