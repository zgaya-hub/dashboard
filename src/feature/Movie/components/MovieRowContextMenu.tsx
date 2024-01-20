import { CheckBoxIcon, DeleteIcon, DetailsIcon, EditIcon, OpenTabIcon, PlayArrowIcon, RefreshIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Divider, ListItemText, PopoverPosition, SxProps } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useNavigation from "@/navigation/useNavigation";
import { useTranslation } from "react-i18next";
import { useDeleteMovieById } from "../hooks";

interface MovieRowContextMenuProps {
  onRefresh: () => void;
  onSelect: () => void;
  onClose: () => void;
  isOpen: boolean;
  anchorPosition: PopoverPosition;
  movieId: string;
}

export default function MovieRowContextMenu({ isOpen, onClose, onRefresh, onSelect, anchorPosition, movieId }: MovieRowContextMenuProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { mutateAsync: deleteMovieByIdMutateAsync } = useDeleteMovieById();

  const handleOnDeleteMovie = async () => {
    // TODO: should show confirmaion modal
    await deleteMovieByIdMutateAsync({ MovieId: movieId });
    onRefresh();
  };

  const handleOnEdit = () => {
    navigation.navigate("/movie/update", { movieId });
    // window.open(`/quick/movie-update/${movieId}`, "_blank", "width=500,height=800");
  };

  const handleOnDetails = () => {
    navigation.navigate(`/movie/details`, { movieId });
  };

  const menuItemStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(32),
  }));

  return (
    <Menu id="movie-context-menu" anchorReference="anchorPosition" anchorPosition={anchorPosition} onClose={onClose} open={isOpen} onClick={onClose}>
      <MenuItem sx={menuItemStyle}>
        <OpenTabIcon isListIcon />
        <ListItemText>{t("Feature.Movie.MovieRowContextMenu.playOnZgayaHub")}</ListItemText>
      </MenuItem>
      <MenuItem sx={menuItemStyle}>
        <PlayArrowIcon isListIcon />
        <ListItemText>{t("Feature.Movie.MovieRowContextMenu.quickPlay")}</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onRefresh} sx={menuItemStyle}>
        <RefreshIcon isListIcon />
        <ListItemText>{t("Feature.Movie.MovieRowContextMenu.refresh")}</ListItemText>
      </MenuItem>
      <MenuItem onClick={onSelect} sx={menuItemStyle}>
        <CheckBoxIcon isListIcon />
        <ListItemText>{t("Feature.Movie.MovieRowContextMenu.select")}</ListItemText>
      </MenuItem>
      <Divider />
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
