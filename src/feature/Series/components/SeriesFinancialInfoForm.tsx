import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Stack, Typography, Paper } from "@mui/material";

import { PriceField } from "@/components/Form";
import { SeriesCreateFormFieldInterface } from "../types";

interface SeriesFinancialInfoFormProps {
  formControl: Control<SeriesCreateFormFieldInterface>;
}

export default function SeriesFinancialInfoForm({ formControl }: Readonly<SeriesFinancialInfoFormProps>) {
  const { t } = useTranslation();

  return (
    <Stack component={Paper} padding={4} gap={2}>
      <Typography variant="h5">{t("Feature.Series.SeriesFinancialInfoForm.addFinancialInfo")}</Typography>
      <Stack direction={{ md: "column", lg: "row" }} gap={2}>
        <PriceField fullWidth label={t("Feature.Series.SeriesFinancialInfoForm.budget")} control={formControl} name="budget" />
        <PriceField fullWidth label={t("Feature.Series.SeriesFinancialInfoForm.netProfit")} control={formControl} name="netProfit" />
        <PriceField fullWidth label={t("Feature.Series.SeriesFinancialInfoForm.revenue")} control={formControl} name="revenue" />
      </Stack>
    </Stack>
  );
}
