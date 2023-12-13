import { SxProps } from "@mui/material";
import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from "@mui/material/IconButton";

interface IconButonProps extends MuiIconButtonProps {
  isActive?: boolean;
}

export default function IconButon({ children, ...restProps }: IconButonProps) {
  const buttonStyle: SxProps = {
    borderRadius: "0", // Set border radius to 0 for a square shape

    ".Mui-disabled": {
      borderRadius: 0,
    },
    ".MuiIconButton-colorError": {
      borderRadius: 0,
    },
    ".MuiIconButton-colorInfo": {
      borderRadius: 0,
    },
    ".MuiIconButton-colorInherit": {
      borderRadius: 0,
    },
    ".MuiIconButton-colorPrimary": {
      borderRadius: 0,
    },
    ".MuiIconButton-colorSecondary": {
      borderRadius: 0,
    },
    ".MuiIconButton-colorSuccess": {
      borderRadius: 0,
    },
    ".MuiIconButton-colorWarning": {
      borderRadius: 0,
    },
    ".MuiIconButton-edgeEnd": {
      borderRadius: 0,
    },
    ".MuiIconButton-edgeStart": {
      borderRadius: 0,
    },
    ".MuiIconButton-root": {
      borderRadius: 0,
    },
    ".MuiIconButton-sizeLarge": {
      borderRadius: 0,
    },
    ".MuiIconButton-sizeMedium": {
      borderRadius: 0,
    },
    ".MuiIconButton-sizeSmal": {
      borderRadius: 0,
    },
  };

  return <MuiIconButton sx={buttonStyle} {...restProps}>{children}</MuiIconButton>;
}
