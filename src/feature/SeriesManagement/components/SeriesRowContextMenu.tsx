import { CheckBoxIcon, DeleteIcon, EditIcon, OpenTabIcon, PlaySquareIcon, RefreshIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Divider, ListItemText, PopoverPosition, SxProps } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface SeriesRowContextMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onPreview: () => void;
  onRefresh: () => void;
  onSelect: () => void;
  onSeasonCreate: () => void;
  onClose: () => void;
  isOpen: boolean;
  anchorPosition: PopoverPosition;
}

export default function SeriesRowContextMenu({ onDelete, onEdit, isOpen, onClose, onPreview, onRefresh, onSelect, onSeasonCreate, anchorPosition }: SeriesRowContextMenuProps) {
  const menuItemStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(24),
  }));
  return (
    <Menu id="series-context-menu" anchorReference="anchorPosition" anchorPosition={anchorPosition} onClose={onClose} open={isOpen} onClick={onClose}>
      <MenuItem onClick={onPreview} sx={menuItemStyle}>
        <OpenTabIcon isListIcon fontSize="small" />
        <ListItemText>Preview</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onRefresh} sx={menuItemStyle}>
        <RefreshIcon isListIcon fontSize="small" />
        <ListItemText>Refresh</ListItemText>
      </MenuItem>
      <MenuItem onClick={onSeasonCreate} sx={menuItemStyle}>
        <PlaySquareIcon isListIcon fontSize="small" />
        <ListItemText>Create season</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onSelect} sx={menuItemStyle}>
        <CheckBoxIcon isListIcon fontSize="small" />
        <ListItemText>Select</ListItemText>
      </MenuItem>
      <MenuItem onClick={onEdit} sx={menuItemStyle}>
        <EditIcon isListIcon fontSize="small" color="primary" />
        <ListItemText>Edit</ListItemText>
      </MenuItem>
      <MenuItem onClick={onDelete} sx={menuItemStyle}>
        <DeleteIcon isListIcon fontSize="small" color="error" />
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );
}
