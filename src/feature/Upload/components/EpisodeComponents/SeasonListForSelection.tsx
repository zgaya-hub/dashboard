import { List, ListItem, SxProps } from "@mui/material";
import { Season } from "zgaya.hub-client-types/lib";

import { AvatarTitleAndDescCard, AvatarTitleAndDescCardSkeleton } from "@/components/Cards";
import { RadioButtonCheckedIcon, RadioButtonUncheckedIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface SeasonListForSelectionProps {
  seasons: Season[];
  selectedSeasonId: string | null;
  onSelectedSeason: (seasonId: string) => void;
  isLoading: boolean;
}

export default function SeasonListForSelection({ seasons, selectedSeasonId, onSelectedSeason, isLoading }: SeasonListForSelectionProps) {
  const listStyle = useThemeStyles<SxProps>(theme => ({
    maxHeight: theme.spacing(96),
    overflowY: "auto",
  }));

  if (isLoading) {
    return (
      <List sx={listStyle}>
        {["", "", ""].map(() => (
          <ListItem>
            <AvatarTitleAndDescCardSkeleton />
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <List sx={listStyle}>
      {seasons.map(season => {
        const isSelected = selectedSeasonId === season.ID;
        return (
          <ListItem key={season.ID} onClick={() => onSelectedSeason(season.ID)}>
            <AvatarTitleAndDescCard action={isSelected ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />} title={season.title} description={season.plotSummary} avatar={season.number} />
          </ListItem>
        );
      })}
    </List>
  );
}
