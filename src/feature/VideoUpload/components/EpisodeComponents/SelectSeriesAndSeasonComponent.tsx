import { Card, CardHeader, List, ListItem, ListItemButton, SxProps, TypographyProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import SelectSeriesCard from "./SelectSeriesCard";
import { useGetManagerSeriesWithImageAndBasicInfo } from "../../hooks/queryHooks";
import { useState } from "react";
import { GetManagerSeriesWithImageAndBasicInfo } from "../../hooks/queryHooks.types";
import useTheme from "@/theme/Theme.context";

interface SelectSeriesAndSeasonComponentProps {}

export default function SelectSeriesAndSeasonComponent({}: SelectSeriesAndSeasonComponentProps) {
  const { theme } = useTheme();
  const [selectedItem, setSelectedItem] = useState<GetManagerSeriesWithImageAndBasicInfo | null>(null);
  const { data: managerSeriesWithImageAndBasicInfo = [] } = useGetManagerSeriesWithImageAndBasicInfo();

  const listContainerStyle: SxProps = {
    width: "fit-content",
    position: "relative",
  };

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
        <Card sx={listContainerStyle} >
          <CardHeader titleTypographyProps={{
            fontSize: 10
          }} title={selectedItem.mediaBasicInfo.mediaTitle} />
          <List sx={listStyle}>
            {managerSeriesWithImageAndBasicInfo.map((series) => (
              <ListItem key={series.ID} onClick={() => setSelectedItem(series)}>
                <SelectSeriesCard thumbnail={"https://images.nightcafe.studio//assets/tdraw-girl.jpg?tr=w-1200,c-at_max"} title={series.mediaBasicInfo.mediaTitle} ID={series.ID} />
              </ListItem>
            ))}
          </List>
        </Card>
      );
    } else {
      return (
        <Card sx={listContainerStyle}>
          <CardHeader /* titleTypographyProps={titleSize} */ t title="Hi im Header" />
          <List sx={listStyle}>
            {managerSeriesWithImageAndBasicInfo.map((series) => (
              <ListItem key={series.ID} onClick={() => setSelectedItem(series)}>
                <SelectSeriesCard thumbnail={"https://images.nightcafe.studio//assets/tdraw-girl.jpg?tr=w-1200,c-at_max"} title={series.mediaBasicInfo.mediaTitle} ID={series.ID} />
              </ListItem>
            ))}
          </List>
        </Card>
      );
    }
  };

  return renderItem();
}
