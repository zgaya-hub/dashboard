import Button from "@/components/Button";
import { DatePickerModal, Form, TextField } from "@/components/Form";
import Elevator from "@/components/Tags/Elevator";
import { SaveIcon } from "@/components/icons";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export interface SeriesBasicInformationFormFieldType {
  title: string;
  plotSummary: string;
  releaseDate: number;
}

interface SeriesBasicInformationFormProps {
  onSave: (input: SeriesBasicInformationFormFieldType) => void;
  isLoading: boolean;
}

export default function SeriesBasicInformationForm({ onSave, isLoading }: SeriesBasicInformationFormProps) {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SeriesBasicInformationFormFieldType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      plotSummary: DUMMY_PLOT_SUMMARY,
      releaseDate: new Date().getTime(),
    },
  });

  const renderForm = (
    <Form onSubmit={handleSubmit(onSave)} gap={2}>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <TextField register={register} name="title" label={t("Feature.SeriesManagement.SeriesBasicInformationForm.title")} helperText={errors.title?.message} error={!!errors.title} fullWidth required />
        <Controller control={control} name="releaseDate" rules={{ required: true }} render={({ field }) => <DatePickerModal onChange={(date) => field.onChange(date?.getTime())} inputRef={field.ref} value={new Date(field.value)} label={t("Feature.SeriesManagement.SeriesBasicInformationForm.releaseDate")} views={["year", "month"]} fullWidth />} />
      </Stack>
      <TextField register={register} name="plotSummary" label={t("Feature.SeriesManagement.SeriesBasicInformationForm.plotSummary")} helperText={errors.plotSummary?.message} error={!!errors.plotSummary} multiline rows={5} fullWidth required />
      <DevTool control={control} />
    </Form>
  );

  return (
    <Elevator padding={4} gap={2}>
      <Typography variant="h5">{t("Feature.SeriesManagement.SeriesBasicInformationForm.addBasicInformation")}</Typography>
      {renderForm}
      <Stack direction={"row"} mt={"auto"} justifyContent={"end"} gap={2}>
        <Button variant="text">{t("Feature.SeriesManagement.SeriesBasicInformationForm.cancel")}</Button>
        <Button loading={isLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleSubmit(onSave)}>
          {t("Feature.SeriesManagement.SeriesBasicInformationForm.save")}
        </Button>
      </Stack>
    </Elevator>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.string().required("Release date is required"),
});

const DUMMY_PLOT_SUMMARY = "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing ";
