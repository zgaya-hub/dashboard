import { DataGridPro as MuiDataGridPro, DataGridProProps as MuiDataGridProProps } from "@mui/x-data-grid-pro";
import { DataGridEmptyComponent } from ".";
import { Fragment, ReactNode, useState } from "react";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { SxProps } from "@mui/material";

interface DataGridProProps extends MuiDataGridProProps {
  contextMenuComponent?: (isOpen: boolean, onClose: () => void, anchorEl: HTMLElement) => ReactNode;
  headerChildren?: ReactNode;
}

export default function DataGridPro({ slots, contextMenuComponent, headerChildren, ...restProps }: DataGridProProps) {
  const [contextMenuAnchorEl, setContextMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setContextMenuAnchorEl(event.currentTarget);
  };

  const dataGridProStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.default,
    paddingX: theme.spacing(4),
    paddingY: theme.spacing(1),
    minHeight: theme.spacing(64),
    height: "auto",
  }));

  return (
    <Fragment>
      {headerChildren}
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
      {contextMenuComponent ? contextMenuComponent(!!contextMenuAnchorEl, () => setContextMenuAnchorEl(null), contextMenuAnchorEl) : null}
    </Fragment>
  );
}
