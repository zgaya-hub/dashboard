import { AvatarTitleAndDescCard, AvatarTitleAndDescCardSkeleton } from "@/components/Cards";
import { RadioButtonCheckedIcon, RadioButtonUncheckedIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Card, List, ListItem, SxProps } from "@mui/material";
import { GetSeasonBySeriesIdOutput } from "../../hooks/queryHooks.types";

interface SeasonListForSelectionProps {
  seasons: GetSeasonBySeriesIdOutput[];
  selectedSeasonId: string | null;
  onSelectedSeason: (seasonId: string) => void;
  isLoading: boolean;
}

export default function SeasonListForSelection({ seasons, selectedSeasonId, onSelectedSeason, isLoading }: SeasonListForSelectionProps) {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(48),
    position: "relative",
    boxShadow: "none",
    padding: 0
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
              <AvatarTitleAndDescCardSkeleton />
            </ListItem>
          ))}
        </List>
      </Card>
    );
  }

  return (
    <Card sx={cardStyle}>
      <List sx={listStyle}>
        {seasons.map((season) => {
          const isSelected = selectedSeasonId === season.ID;
          return (
            <ListItem key={season.ID} onClick={() => onSelectedSeason(season.ID)}>
              <AvatarTitleAndDescCard action={isSelected ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />} title={season.mediaBasicInfo.mediaTitle} description={season.mediaBasicInfo.mediaPlotSummary} avatar={season.seasonNo} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
