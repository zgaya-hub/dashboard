import { DatePickerModal, Form, TextField } from "@/components/Form";
import { RadioGroupModal } from "@/components/Modals";
import Elevator from "@/components/Tags/Elevator";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface SeriesCreateFormFieldType {
  title: string;
  plotSummary: string;
  releaseDate: number;
}

interface SeriesCreateFormProps {
  onSave: (input: SeriesCreateFormFieldType) => void;
}

export default function SeriesCreateForm({ onSave }: SeriesCreateFormProps) {
  const { t } = useTranslation();



  const renderForm = (
    <Form gap={2}>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <TextField register={register} name="title" label={t("Feature.SeriesManagement.SeriesCreateForm.title")} helperText={errors.title?.message} error={!!errors.title} fullWidth required />
        <Controller control={control} name="releaseDate" rules={{ required: true }} render={({ field }) => <DatePickerModal onChange={(date) => field.onChange(date?.getTime())} inputRef={field.ref} value={new Date(field.value)} label={t("Feature.SeriesManagement.SeriesCreateForm.releaseDate")} views={["year", "month"]} fullWidth />} />
      </Stack>
      <TextField register={register} name="plotSummary" label={t("Feature.SeriesManagement.SeriesCreateForm.plotSummary")} helperText={errors.plotSummary?.message} error={!!errors.plotSummary} multiline rows={5} fullWidth required />
      <DevTool control={control} />
    </Form>
  );

  return (
    <Elevator padding={4} gap={2}>
      <Typography variant="h5">{t("Feature.SeriesManagement.SeriesCreateForm.addBasicInformation")}</Typography>
      {renderForm}
      <RadioGroupModal />
      {/* <Stack direction={"row"} mt={"auto"} justifyContent={"end"} gap={2}>
        <Button variant="text">{t("Feature.SeriesManagement.SeriesCreateForm.cancel")}</Button>
        <Button loading={isLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleSubmit(onSave)}>
          {t("Feature.SeriesManagement.SeriesCreateForm.save")}
        </Button>
      </Stack> */}
    </Elevator>
  );
}



const DUMMY_PLOT_SUMMARY = "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing ";
