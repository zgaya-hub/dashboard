import { DataGridPro as MuiDataGridPro, DataGridProProps as MuiDataGridProProps } from "@mui/x-data-grid-pro";
import { DataGridEmptyComponent } from ".";
import { Fragment } from "react";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { SxProps } from "@mui/material";

interface DataGridProProps extends MuiDataGridProProps {}

export default function DataGridPro({ slots, ...restProps }: DataGridProProps) {
  const dataGridProStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.default,
    paddingY: theme.spacing(1),
    height: theme.spacing(64),
  }));

  return (
    <Fragment>
      <MuiDataGridPro sx={dataGridProStyle} {...restProps} slots={{ noRowsOverlay: DataGridEmptyComponent, ...slots }} />
    </Fragment>
  );
}
