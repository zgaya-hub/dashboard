import { useTranslation } from "react-i18next";
import { Stack, Typography, Paper } from "@mui/material";

import Button from "@/components/Button";
import { SaveIcon } from "@/components/icons";

import SeriesUpdateForm from "../components/SeriesUpdateForm";
import { useParams } from "react-router-dom";

export default function SeriesUpdateScreen() {
  const { t } = useTranslation();
  const params = useParams();

  return (
    <Stack>
      <Stack component={Paper} p={2} justifyContent={"space-between"} direction={"row"} gap={1} alignItems={"center"}>
        <Typography variant="h5">{t("Feature.Quick.SeriesUpdateScreen.updateService")}</Typography>
        <Stack direction={"row"} gap={1}>
          <Button variant="text" onClick={() => window.close()}>
            {t("Feature.Quick.SeriesUpdateScreen.back")}
          </Button>
          <Button endIcon={<SaveIcon />} variant="contained">
            {t("Feature.Quick.SeriesUpdateScreen.save")}
          </Button>
        </Stack>
      </Stack>
      <SeriesUpdateForm seriesId={params.seriesId!} />
    </Stack>
  );
}
