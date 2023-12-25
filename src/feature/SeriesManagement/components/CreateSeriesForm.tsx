import { Form, TextField } from "@/components/Form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import Stack from "@mui/material/Stack";
import { Controller, useForm } from "react-hook-form";
import yup from "yup";

export interface CreateEpisodeFormFieldType {
  title: string;
  plotSummary: string;
  releaseDate: number;
}

interface CreateSeriesFormProps {}

export default function CreateSeriesForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<CreateEpisodeFormFieldType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      plotSummary: DUMMY_PLOT_SUMMARY,
      releaseDate: new Date().getTime(),
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSave)} sx={inputContainerStyle} gap={2}>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <TextField register={register} name="title" label="Title" helperText={errors.title?.message} error={!!errors.title} fullWidth required />
        <Controller control={control} name="releaseDate" rules={{ required: true }} render={({ field }) => <DatePickerModal onChange={(date) => field.onChange(date?.getTime())} inputRef={field.ref} value={new Date(field.value)} label="Release date" views={["year", "month"]} fullWidth />} />
      </Stack>
      <TextField register={register} name="plotSummary" label="Plot summary" helperText={errors.plotSummary?.message} error={!!errors.plotSummary} multiline rows={5} fullWidth required />
      <DevTool control={control} />
    </Form>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.string().required("Release date is required"),
});

const DUMMY_PLOT_SUMMARY = "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing ";
