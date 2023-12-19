import { Stack, StackProps } from "@mui/material";
import React from "react";

interface FormProps extends StackProps {}

export default function Form({ onSubmit, ...restProps }: FormProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && event.shiftKey) {
      if (onSubmit) {
        onSubmit(event);
      }
    }
  };

  return <Stack component={"form"} onSubmit={onSubmit} onKeyDown={handleKeyDown} {...restProps} />;
}
