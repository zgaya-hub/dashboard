import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ListItemText, MenuItem } from "@mui/material";
import { values } from "lodash";
import { MediaStatusEnum } from "zgaya.hub-client-types/lib";

import { SelectInput } from "@/components/Form";

import { SeriesCreateFormFieldInterface } from "../types";

interface SeriesStatusSelectComponentProps {
  formRegister: UseFormRegister<SeriesCreateFormFieldInterface>;
}

export default function SeriesStatusSelectComponent({ formRegister }: SeriesStatusSelectComponentProps) {
  const { t } = useTranslation();

  return (
    <SelectInput label={t("Feature.Series.SeriesAdditionalInfoForm.selectStatus")} fullWidth name="status" register={formRegister}>
      {seriesStatusesList.map(seriesStatus => {
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
