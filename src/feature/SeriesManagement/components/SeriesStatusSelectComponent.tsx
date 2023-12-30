import { ListItemText, MenuItem, SelectChangeEvent } from "@mui/material";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SeriesCreateFormFieldInterface } from "../types";
import { values } from "lodash";
import { StatusEnum } from "@/types/enum";
import { SelectInput } from "@/components/Form";

interface SeriesStatusSelectComponentProps {
  setCreateSeriesFormValue: UseFormSetValue<SeriesCreateFormFieldInterface>;
  watchCreateSeriesFormValue: UseFormWatch<SeriesCreateFormFieldInterface>;
}

export default function SeriesStatusSelectComponent({ setCreateSeriesFormValue, watchCreateSeriesFormValue }: SeriesStatusSelectComponentProps) {
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    setCreateSeriesFormValue("status", event.target.value);
  };

  return (
    <SelectInput label={t("Feature.SeriesManagement.SeriesAdditionalInformationForm.selectStatus")} fullWidth value={watchCreateSeriesFormValue("status")} onChange={handleChange}>
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

const seriesStatusesList = values(StatusEnum);
