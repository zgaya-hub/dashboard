import { DeleteIcon, EditIcon, SelectAllIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { ListItemText, SxProps } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface SeriesRowContextMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  anchorEl: HTMLElement;
  isOpen: boolean;
}

export default function SeriesRowContextMenu({ onDelete, onEdit, isOpen, onClose, anchorEl }: SeriesRowContextMenuProps) {
  const menuItemStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(24),
  }));
  return (
    <Menu id="series-context-menu" anchorEl={anchorEl} onClose={onClose} open={isOpen} onClick={onClose}>
      <MenuItem onClick={onEdit} sx={menuItemStyle}>
        <SelectAllIcon isListIcon fontSize="small" />
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
