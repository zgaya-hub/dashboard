import Button from "@/components/Button";
import { DatePickerModal, Form, TextField } from "@/components/Form";
import { SaveIcon } from "@/components/icons";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import Stack from "@mui/material/Stack";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export interface CreateSeriesFormFieldType {
  title: string;
  plotSummary: string;
  releaseDate: number;
}

interface CreateSeriesFormProps {
  onSave: (input: CreateSeriesFormFieldType) => void;
  onThumbnailSelect: (thumbnail: File) => void;
  isLoading: boolean;
  thumbnailUrl: string;
}

export default function CreateSeriesForm({ onSave, isLoading }: CreateSeriesFormProps) {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateSeriesFormFieldType>({
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
        <TextField register={register} name="title" label="Title" helperText={errors.title?.message} error={!!errors.title} fullWidth required />
        <Controller control={control} name="releaseDate" rules={{ required: true }} render={({ field }) => <DatePickerModal onChange={(date) => field.onChange(date?.getTime())} inputRef={field.ref} value={new Date(field.value)} label="Release date" views={["year", "month"]} fullWidth />} />
      </Stack>
      <TextField register={register} name="plotSummary" label="Plot summary" helperText={errors.plotSummary?.message} error={!!errors.plotSummary} multiline rows={5} fullWidth required />
      <DevTool control={control} />
    </Form>
  );

  return (
    <Stack gap={2}>
      {renderForm}
      <Stack direction={"row"} mt={"auto"} justifyContent={"end"} gap={2}>
        <Button variant="text">{t("Feature.VideoUpload.EpisodeUploadModal.cancel")}</Button>
        <Button loading={isLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleSubmit(onSave)}>
          {t("Feature.VideoUpload.EpisodeUploadModal.next")}
        </Button>
      </Stack>
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.string().required("Release date is required"),
});

const DUMMY_PLOT_SUMMARY = "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing ";
