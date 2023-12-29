import { DataGridPro as MuiDataGridPro, DataGridProProps as MuiDataGridProProps } from "@mui/x-data-grid-pro";
import { DataGridEmptyComponent } from ".";
import { Fragment, ReactNode, useState } from "react";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { SxProps } from "@mui/material";

interface DataGridProProps extends MuiDataGridProProps {
  contextMenuComponent?: (isOpen: boolean, onClose: () => void, anchorEl: HTMLElement) => ReactNode;
}

export default function DataGridPro({ slots, contextMenuComponent, ...restProps }: DataGridProProps) {
  const [contextMenuAnchorEl, setContextMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setContextMenuAnchorEl(event.currentTarget);
  };

  const dataGridProStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.default,
    paddingY: theme.spacing(1),
    height: theme.spacing(64),
  }));

  return (
    <Fragment>
      <MuiDataGridPro
        sx={dataGridProStyle}
        {...restProps}
        slots={{ noRowsOverlay: DataGridEmptyComponent, ...slots }}
        slotProps={{
          row: {
            onContextMenu: handleContextMenu,
          },
        }}
      />
      {contextMenuComponent ? contextMenuComponent(!!contextMenuAnchorEl, () => setContextMenuAnchorEl(null), contextMenuAnchorEl!) : null}
    </Fragment>
  );
}
