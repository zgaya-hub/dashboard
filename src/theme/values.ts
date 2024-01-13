/* eslint-disable no-restricted-imports */
import { ThemeOptions } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

export const typography: TypographyOptions = {
  fontFamily: ["Roboto", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Arial", "sans-serif"].join(","),
  fontSize: 15,
  h4: {
    fontSize: 24,
    fontWeight: 700,
  },
  h5: {
    fontSize: 20,
    fontWeight: 600,
  },
  h6: {
    fontSize: 15,
    fontWeight: 500,
  },
  body1: {
    fontSize: 15,
    fontWeight: 400,
  },
  body2: {
    fontWeight: 400,
  },
  subtitle1: {
    fontWeight: 600,
  },
  subtitle2: {
    fontWeight: 400,
  },
  caption: {
    fontWeight: 400,
  },
};

// kindly use this types for spacing
export const spacing = [1, 2, 4, 8, 12, 16, 18, 24, 32, 36, 48, 54, 64, 96];

export const lightThemeComponents: ThemeOptions["components"] = {
  MuiList: {
    styleOverrides: {
      root: {
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        background: "#ffffff",
      },
    },
  },
  MuiAppBar: {
    defaultProps: {
      elevation: 1,
    },
  },
  MuiMenu: {
    styleOverrides: {
      root: {
        "& .MuiMenu-list": {
          background: "#ffffff",
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        background: "#ffffff",
      },
    },
  },
  MuiPopover: {
    styleOverrides: {
      root: {
        "& .MuiPopover-root": {
          background: "#ffffff",
        },
      },
    },
  },
  MuiCircularProgress: {
    styleOverrides: {
      root: {
        "& .MuiCircularProgress-circle": {
          strokeLinecap: "round",
        },
      },
    },
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        height: "max-content",
      },
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: {
        background: "#ffffff",
      },
    },
  },
  MuiMenuItem: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiIconButton: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiRadio: {
    defaultProps: {
      disableRipple: true,
    },
  },
};

export const darkThemeComponents: ThemeOptions["components"] = {
  MuiList: {
    styleOverrides: {
      root: {
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        background: "#1c1b1b",
      },
    },
  },
  MuiAppBar: {
    defaultProps: {
      elevation: 1,
    },
  },
  MuiMenu: {
    styleOverrides: {
      root: {
        "& .MuiMenu-list": {
          background: "#1c1b1b",
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        background: "#1c1b1b",
      },
    },
  },
  MuiCircularProgress: {
    styleOverrides: {
      root: {
        "& .MuiCircularProgress-circle": {
          strokeLinecap: "round",
        },
      },
    },
  },
  MuiMenuItem: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiIconButton: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiRadio: {
    defaultProps: {
      disableRipple: true,
    },
  },
};
