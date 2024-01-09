import { ListItemText, MenuItem } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CineastCreateFormFieldInterface } from "../types";
import { values } from "lodash";
import { CineastProfessionEnum } from "@/types/enum";
import { SelectInput } from "@/components/Form";

interface ProfessionSelectorProps {
  formRegister: UseFormRegister<CineastCreateFormFieldInterface>;
}

export default function ProfessionSelector({ formRegister }: ProfessionSelectorProps) {
  const { t } = useTranslation();

  return (
    <SelectInput label={t("Feature.Quick.CineastCreateForm.profession")} fullWidth name="profession" register={formRegister}>
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

const seriesStatusesList = values(CineastProfessionEnum);
