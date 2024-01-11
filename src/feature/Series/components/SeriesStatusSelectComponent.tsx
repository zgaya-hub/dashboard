import { ListItemText, MenuItem } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SeriesCreateFormFieldInterface } from "../types";
import { values } from "lodash";
import { SelectInput } from "@/components/Form";
import { MediaStatusEnum } from "mirra-scope-client-types/lib";

interface SeriesStatusSelectComponentProps {
  formRegister: UseFormRegister<SeriesCreateFormFieldInterface>;
}

export default function SeriesStatusSelectComponent({ formRegister }: SeriesStatusSelectComponentProps) {
  const { t } = useTranslation();

  return (
    <SelectInput label={t("Feature.Series.SeriesAdditionalInfoForm.selectStatus")} fullWidth name="status" register={formRegister}>
      {seriesStatusesList.map((seriesStatus) => {
        return (
          <MenuItem value={seriesStatus}>
            <ListItemText>{seriesStatus}</ListItemText>
          </MenuItem>
        );
      })}
    </SelectInput>
  );
}

const seriesStatusesList = values(MediaStatusEnum);
