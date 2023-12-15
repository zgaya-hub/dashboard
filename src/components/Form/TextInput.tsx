import { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import { SimpleInputProps } from "./SimpleInput";

interface TextInputProps extends SimpleInputProps {
  onTextChange?: (text: string) => void;
}

export default function TextInput({ onTextChange, ...restProps }: TextInputProps) {
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;

    if (onTextChange) {
      onTextChange(newText);
    }
  };

  return <TextField onChange={handleTextChange} {...restProps} />;
}
