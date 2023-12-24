import { SxProps } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Fragment } from "react";
import AppBar from "@/components/AppBar";
import useNavigation from "@/navigation/use-navigation";
import { useTranslation } from "react-i18next";
import { UploadIcon } from "@/components/icons";
import Button from "@/components/Button";
import { Outlet } from "react-router-dom";

export default function LayoutHeader() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const appBarStyle: SxProps = {
    zIndex: 1,
  };

  const toolbarStyle: SxProps = {
    justifyContent: "flex-end",
  };

  return (
    <Fragment>
      <AppBar sx={appBarStyle}>
        <Toolbar sx={toolbarStyle}>
          <Button onClick={() => navigation.navigate("/video-upload/movie")} startIcon={<UploadIcon />}>
            {t("AuthenticatedRoutes.uploadMovie")}
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Fragment>
  );
}
