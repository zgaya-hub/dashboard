import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectProps } from "@mui/material/Select";

interface SelectInputProps extends SelectProps {
  helperText?: string;
}

export default function SelectInput({ error, helperText, label, fullWidth, children, ...restProps }: SelectInputProps) {
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id="demo-simple-select-label" error={error}>
        {label}
      </InputLabel>
      <Select label={label} fullWidth={fullWidth} error={error} {...restProps}>
        {children}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
}
