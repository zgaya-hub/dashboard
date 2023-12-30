import { CircularProgress, InputAdornment, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps, SxProps } from "@mui/material";
import { AttachFileIcon, ErrorIcon } from "../icons";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { DEFAULT_IMAGE_SIZE } from "@/mock/constants";

interface FileSelectInputProps extends Omit<MuiTextFieldProps, "sx" | "label"> {
  onFileSelect: (file: File) => void;
  loading?: boolean;
  maxSize?: number;
  sx?: SxProps;
  label?: string;
}

export default function FileSelectInput({ onFileSelect, loading, error, maxSize, label, ...restProps }: FileSelectInputProps) {
  const { t } = useTranslation();
  const onDrop = ([image]: File[]) => {
    onFileSelect(image);
  };

  const { getRootProps, isDragActive } = useDropzone({ onDrop, maxSize: maxSize ?? DEFAULT_IMAGE_SIZE * 1024 });

  return (
    <MuiTextField
      InputLabelProps={{
        shrink: false,
      }}
      placeholder={isDragActive ? t("Components.Form.FileSelectInput.dropItHere") : label ?? t("Components.Form.FileSelectInput.selectAFile")}
      InputProps={{
        readOnly: true,
        startAdornment: (
          <InputAdornment position="start">
            <AttachFileIcon />
          </InputAdornment>
        ),
        endAdornment: <InputAdornment position="end">{loading ? <CircularProgress size={20} /> : error ? <ErrorIcon color="error" /> : null}</InputAdornment>,
      }}
      error={error}
      {...getRootProps()}
      {...restProps}
    />
  );
}
