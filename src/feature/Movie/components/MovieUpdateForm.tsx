import { Control } from "react-hook-form";
import { MovieUpdateFormFieldInterface } from "../types";
import { DatePickerModal, TextField } from "@/components/Form";
import { Paper, Stack } from "@mui/material";

interface MovieUpdateFormProps {
  formControl: Control<MovieUpdateFormFieldInterface>;
}

export default function MovieUpdateForm({ formControl }: MovieUpdateFormProps) {
  /* TODO: use i18n here */
  return (
    <Stack component={Paper} width={"100%"} gap={2} p={2}>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <TextField control={formControl} name="title" label="Title" fullWidth />
        <DatePickerModal control={formControl} name="releaseDate" label="Release date" views={["year", "month"]} fullWidth />
      </Stack>
      <TextField control={formControl} name="plotSummary" label="Plot summary" multiline rows={5} fullWidth />
    </Stack>
  );
}
