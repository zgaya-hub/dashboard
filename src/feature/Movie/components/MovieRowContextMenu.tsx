/* import { CheckBoxIcon, DeleteIcon, DetailsIcon, EditIcon, OpenTabIcon, PlaySquareIcon, RefreshIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Divider, ListItemText, PopoverPosition, SxProps } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import { useDeleteMovieById } from "../hooks";
import useNavigation from "@/navigation/useNavigation";
import { useTranslation } from "react-i18next";

interface MovieRowContextMenuProps {
  onRefresh: () => void;
  onSelect: () => void;
  onClose: () => void;
  isOpen: boolean;
  anchorPosition: PopoverPosition;
  seriesId: string;
}

export default function MovieRowContextMenu({ isOpen, onClose, onRefresh, onSelect, anchorPosition, seriesId }: MovieRowContextMenuProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { mutateAsync: deleteMovieByIdMutateAsync } = useDeleteMovieById();

  const handleOnDeleteMovie = async () => {
    await deleteMovieByIdMutateAsync({ MovieId: seriesId });
    onRefresh();
  };

  const handleOnEdit = () => {
    window.open(`/quick/series-update/${seriesId}`, "_blank", "width=500,height=800");
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
        <ListItemText>{t("Feature.Movie.MovieRowContextMenu.preview")}</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onRefresh} sx={menuItemStyle}>
        <RefreshIcon isListIcon />
        <ListItemText>{t("Feature.Movie.MovieRowContextMenu.refresh")}</ListItemText>
      </MenuItem>
      <MenuItem sx={menuItemStyle} onClick={handleOnCreateSeason}>
        <PlaySquareIcon isListIcon />
        <ListItemText>{t("Feature.Movie.MovieRowContextMenu.createSeason")}</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onSelect} sx={menuItemStyle}>
        <CheckBoxIcon isListIcon />
        <ListItemText>{t("Feature.Movie.MovieRowContextMenu.select")}</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOnEdit} sx={menuItemStyle}>
        <EditIcon isListIcon color="primary" />
        <ListItemText>{t("Feature.Movie.MovieRowContextMenu.edit")}</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOnDeleteMovie} sx={menuItemStyle}>
        <DeleteIcon isListIcon color="error" />
        <ListItemText>{t("Feature.Movie.MovieRowContextMenu.delete")}</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleOnDetails} sx={menuItemStyle}>
        <DetailsIcon isListIcon />
        <ListItemText>{t("Feature.Movie.MovieRowContextMenu.details")}</ListItemText>
      </MenuItem>
    </Menu>
  );
}
 */

import React from 'react'

export default function MovieRowContextMenu() {
  return (
    <div>MovieRowContextMenu</div>
  )
}
