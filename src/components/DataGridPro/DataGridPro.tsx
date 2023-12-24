import { DataGridPro as MuiDataGridPro, DataGridProProps as MuiDataGridProProps } from "@mui/x-data-grid-pro";
import { DataGridEmptyComponent } from ".";

interface DataGridProProps extends MuiDataGridProProps {}

export default function DataGridPro({ slots, ...restProps }: DataGridProProps) {
  return <MuiDataGridPro {...restProps} slots={{ noRowsOverlay: DataGridEmptyComponent, ...slots }} />;
}
