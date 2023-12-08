import { SxProps } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Fragment } from "react";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { UploadIcon } from "@/components/icons";
import useNavigation from "@/navigation/use-navigation";
import AppBar from "@/components/AppBar";

export default function LayoutHeader() {
  const naviation = useNavigation();
  const { t } = useTranslation();

  const handleOnClickUpload = () => {
    naviation.navigate("/video-upload");
  };

  const appBarStyle: SxProps = {
    zIndex: 1,
  };

  const toolbarStyle = useThemeStyles<SxProps>((theme) => ({
    justifyContent: "flex-end",
    gap: theme.sizing.sm,
  }));

  return (
    <Fragment>
      <CssBaseline />
      <AppBar sx={appBarStyle}>
        <Toolbar sx={toolbarStyle}>
          <Button size="large" startIcon={<UploadIcon />} onClick={handleOnClickUpload}>
            {t("Layout.AppHeader.uploadVideo")}
          </Button>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
