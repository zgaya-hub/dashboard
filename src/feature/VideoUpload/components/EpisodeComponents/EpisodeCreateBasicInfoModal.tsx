import React, { CSSProperties } from "react";
import { Card, Grid, Hidden, Stack, SxProps, TextField, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import Button from "@/components/Button";
import { FeedbackIcon } from "@/components/icons";
import { Dialog } from "@/components/Dialog";
import { DatePickerModal } from "@/components/Form";
import { DevTool } from "@hookform/devtools";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import useTheme from "@/theme/Theme.context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUploadComponent from "../ImageUploadComponent";
import EpisodeCardComponent from "./EpisodeCardComponent";

export interface BasicInfoFormFieldType {
  title: string;
  plotSummary: string;
  episodeNo: number;
  releaseDate: number;
}

interface EpisodeCreateBasicInfoModalProps {
  isVisible: boolean;
  thumbnailSrc: string;
  onSave: (fields: BasicInfoFormFieldType) => void;
  onCancel: () => void;
  onFeedback: () => void;
  onThumbnailDrop: (episode: File) => void;
  isLoading: boolean;
}

const EpisodeCreateBasicInfoModal: React.FC<EpisodeCreateBasicInfoModalProps> = ({ isVisible, onCancel, thumbnailSrc, onSave, onFeedback, onThumbnailDrop, isLoading }: EpisodeCreateBasicInfoModalProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<BasicInfoFormFieldType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      plotSummary: "",
    },
  });

  const onSubmit = (data: BasicInfoFormFieldType) => {
    onSave(data);
  };

  const dialogBoxStyle = useThemeStyles<SxProps>((theme) => ({
    ".MuiDialog-paperWidthXl": {
      [theme.breakpoints.up("md")]: {
        height: theme.spacing(96),
        width: "100%",
      },
    },
  }));

  const inputContainerStyle = useThemeStyles<SxProps>((theme) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(2),
    background: theme.palette.background.default,
  }));

  const formStyle: CSSProperties = {
    width: "100%",
    height: "100%",
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter" && event.shiftKey) {
      handleSubmit(onSubmit)();
    }
  };

  const InputArea = (
    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} style={formStyle}>
      <Grid sx={inputContainerStyle} md={4}>
        <Stack direction={{ md: "row", sm: "column" }} gap={2}>
          <TextField label="Title" {...register("title")} helperText={errors.title?.message} error={!!errors.title} fullWidth />
          <Controller control={control} name="releaseDate" rules={{ required: true }} render={({ field }) => <DatePickerModal onChange={(date) => field.onChange(date)} inputRef={field.ref} value={field.value} label="Release date" views={["year", "month"]} fullWidth />} />
        </Stack>
        <TextField label="Plot summary" {...register("plotSummary")} helperText={errors.plotSummary?.message} error={!!errors.plotSummary} multiline rows={5} fullWidth />
        <ImageUploadComponent
          onImageDrop={function (video: File): void {
            throw new Error("Function not implemented.");
          }}
          title={t("Feature.VideoUpload.EpisodeCreateBasicInfoModal.imageUploadComponentTitle")}
        />
        <DevTool control={control} />
      </Grid>
    </form>
  );

  const dialogFooter = (
    <>
      <Button onClick={onFeedback} variant="text">
        <FeedbackIcon />
      </Button>
      <Button variant="text" onClick={onCancel}>
        {t("Feature.VideoUpload.EpisodeCreateBasicInfoModal.cancel")}
      </Button>
      <Button variant="contained" onSubmit={handleSubmit(onSubmit)}>
        {t("Feature.VideoUpload.EpisodeCreateBasicInfoModal.next")}
      </Button>
    </>
  );

  return (
    <Dialog maxWidth="xl" sx={dialogBoxStyle} fullScreen={fullScreen} open={isVisible} headerText={t("Feature.VideoUpload.EpisodeCreateBasicInfoModal.headerText")} onClose={onCancel} outAreaClose={false} dialogAction={dialogFooter}>
      <Stack direction={"row"} gap={2} height={"100%"}>
        {InputArea}
        <Hidden mdDown>
          <EpisodeCardComponent title={watch("title")} plotSummary={watch("plotSummary")} thumbnail={thumbnailSrc} />
        </Hidden>
      </Stack>
    </Dialog>
  );
};

export default EpisodeCreateBasicInfoModal;

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.string().required("Release date is required"),
});
{
  /* <ImageUploadComponent isLoading={isLoading} onImageDrop={onThumbnailDrop} title={t("Feature.VideoUpload.EpisodeCreateBasicInfoModal.imageUploadComponentTitle")} /> */
}
