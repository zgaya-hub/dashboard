import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface SeriesGridContextMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  anchorEl: HTMLElement;
  isOpen: boolean;
}

export default function SeriesGridContextMenu({ onDelete, onEdit, isOpen, onClose, anchorEl }: SeriesGridContextMenuProps) {
  return (
    <Menu id="series-context-menu" anchorEl={anchorEl} onClose={onClose} open={isOpen} onClick={onClose}>
      <MenuItem onClick={onEdit}>Edit</MenuItem>
      <MenuItem onClick={onDelete}>Delete</MenuItem>
    </Menu>
  );
}
