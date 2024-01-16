import { ChangeEvent } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { useTranslation } from "react-i18next";
import { SearchIcon, ClearIcon } from "../icons";
import { OutlinedInput, OutlinedInputProps, SxProps, Tooltip } from "@mui/material";

interface SearchInputProps extends Omit<OutlinedInputProps, "sx" | "onChange"> {
  onChange?: (text: string) => void;
  tooltip?: string;
  sx?: SxProps;
  onClose?: () => void;
}

export default function SearchInput({ onChange, sx, tooltip, onClose, ...restProps }: SearchInputProps) {
  const { t } = useTranslation();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    if (onChange) {
      onChange(newText);
    }
  };

  const inputStyle: SxProps = {
    "& .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
    ...sx,
  };

  return (
    <Tooltip title={tooltip || ""}>
      <OutlinedInput
        fullWidth
        {...restProps}
        sx={inputStyle}
        onChange={handleOnChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon tooltip={t("Components.Form.SearchInput.search")} />
          </InputAdornment>
        }
        endAdornment={
          onClose ? (
            <InputAdornment position="end">
              <ClearIcon iconButton={false} onClick={onClose} tooltip={t("Components.Form.SearchInput.close")} />
            </InputAdornment>
          ) : null
        }
      />
    </Tooltip>
  );
}
