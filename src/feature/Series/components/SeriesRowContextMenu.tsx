import { CheckBoxIcon, DeleteIcon, DetailsIcon, EditIcon, OpenTabIcon, PlaySquareIcon, RefreshIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Divider, ListItemText, PopoverPosition, SxProps } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDeleteSeriesById } from "../hooks";
import useNavigation from "@/navigation/useNavigation";
import { useTranslation } from "react-i18next";

interface SeriesRowContextMenuProps {
  onRefresh: () => void;
  onSelect: () => void;
  onClose: () => void;
  isOpen: boolean;
  anchorPosition: PopoverPosition;
  seriesId: string;
}

export default function SeriesRowContextMenu({ isOpen, onClose, onRefresh, onSelect, anchorPosition, seriesId }: SeriesRowContextMenuProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { mutateAsync: deleteSeriesByIdMutateAsync } = useDeleteSeriesById();

  const handleOnDeleteSeries = async () => {
    await deleteSeriesByIdMutateAsync({ SeriesId: seriesId });
    onRefresh();
  };

  const handleOnEdit = () => {
    window.open(`/quick/series-update/${seriesId}`, "_blank", "width=500,height=1000");
    window.open(`/quick/series-update/${seriesId}`, "_blank", "width=500,height=1000");
    window.open(`/quick/series-update/${seriesId}`, "_blank", "width=500,height=1000");
  };

  const handleOnDetails = () => {
    navigation.navigate(`/series/details`, { seriesId });
  };

  const handleOnCreateSeason = () => {
    alert("Edit clicked for row ID:" + seriesId);
  };

  const menuItemStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(24),
  }));

  return (
    <Menu id="series-context-menu" anchorReference="anchorPosition" anchorPosition={anchorPosition} onClose={onClose} open={isOpen} onClick={onClose}>
      <MenuItem sx={menuItemStyle}>
        <OpenTabIcon isListIcon />
        <ListItemText>{t("Feature.Series.SeriesRowContextMenu.preview")}</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onRefresh} sx={menuItemStyle}>
        <RefreshIcon isListIcon />
        <ListItemText>{t("Feature.Series.SeriesRowContextMenu.refresh")}</ListItemText>
      </MenuItem>
      <MenuItem sx={menuItemStyle} onClick={handleOnCreateSeason}>
        <PlaySquareIcon isListIcon />
        <ListItemText>{t("Feature.Series.SeriesRowContextMenu.createSeason")}</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onSelect} sx={menuItemStyle}>
        <CheckBoxIcon isListIcon />
        <ListItemText>{t("Feature.Series.SeriesRowContextMenu.select")}</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOnEdit} sx={menuItemStyle}>
        <EditIcon isListIcon color="primary" />
        <ListItemText>{t("Feature.Series.SeriesRowContextMenu.edit")}</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOnDeleteSeries} sx={menuItemStyle}>
        <DeleteIcon isListIcon color="error" />
        <ListItemText>{t("Feature.Series.SeriesRowContextMenu.delete")}</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleOnDetails} sx={menuItemStyle}>
        <DetailsIcon isListIcon />
        <ListItemText>{t("Feature.Series.SeriesRowContextMenu.details")}</ListItemText>
      </MenuItem>
    </Menu>
  );
}
