import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { ErrorIcon } from "@/components/icons";
import useNavigation from "@/navigation/use-navigation";
import { useTranslation } from "react-i18next";

const SeriesManagementScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const appHeaderChildren = (
    <>
      <Button>{t("Feature.SeriesManagement.SeriesManagementScreen.createSeries")}</Button>
      <Button onClick={() => navigation.navigate("/video-upload/episode")} startIcon={<ErrorIcon />}>
        {t("Feature.SeriesManagement.SeriesManagementScreen.uploadEpisode")}
      </Button>
    </>
  );

  return (
    <Page>
      <Button>Upload</Button>
      <LayoutAppBar />
      <LayoutAppHeader children={appHeaderChildren} />
      <LayoutSideBar />
    </Page>
  );
};

export default SeriesManagementScreen;
