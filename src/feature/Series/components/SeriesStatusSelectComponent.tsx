import { ListItemText, MenuItem } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SeriesCreateFormFieldInterface } from "../types";
import { values } from "lodash";
import { MediaStatusEnum } from "@/types/enum";
import { SelectInput } from "@/components/Form";

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
