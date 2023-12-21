import { Stack, SxProps, TextField } from "@mui/material";
import { DatePickerModal, Form } from "@/components/Form";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

export interface CreateEpisodeFormFieldType {}

interface EpisodeCreateAdditionalInfoStepProps {}

export default function EpisodeCreateAdditionalInfoStep({}: EpisodeCreateAdditionalInfoStepProps) {
  const inputContainerStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.default,
  }));

  const InputArea = (
    <Form sx={inputContainerStyle} gap={2}>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <TextField label="Title" fullWidth />
        <DatePickerModal label="Release date" views={["year", "month"]} fullWidth />
      </Stack>
      <TextField label="Plot summary" multiline rows={5} fullWidth />
    </Form>
  );

  return (
    <Stack direction={"row"} gap={2} height={"100%"}>
      {InputArea}
    </Stack>
  );
}
