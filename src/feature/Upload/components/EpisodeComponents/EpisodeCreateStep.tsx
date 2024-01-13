import { useEffect, useState } from "react";
import { Controller,useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { Hidden, Popover, Stack } from "@mui/material";
import { extractImageBase64, extractImageMetadata, extractImageUrl } from "metalyzer";
import * as yup from "yup";
import { ImageVariantEnum } from "zgaya.hub-client-types/lib";

import Button from "@/components/Button";
import { DatePickerModal, Form, TextField } from "@/components/Form";
import { AttachFileIcon, SaveIcon } from "@/components/icons";

import { DEFAULT_PLOT_SUMMARY, DEFAULT_RELEASE_DATE } from "../../constants";
import { useCreateImage, useCreateImageByUrl, useGetNextEpisodeNumber } from "../../hooks";
import { CreateEpisodeFormFieldType } from "../../types";
import ImageUploadComponent from "../ImageUploadComponent";

import EpisodeCardComponent from "./EpisodeCardComponent";

interface EpisodeCreateStepProps {
  onSave: (fields: CreateEpisodeFormFieldType) => void;
  isLoading: boolean;
  seasonId: string;
  isSaveButtonDisabled: boolean;
}

export default function EpisodeCreateStep({ onSave, isLoading, seasonId, isSaveButtonDisabled }: EpisodeCreateStepProps) {
  const { t } = useTranslation();
  const [episodeNumberPopoverAnchorEl, setEpisodeNumberPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { data: nextSeasonNumberData } = useGetNextEpisodeNumber({ SeasonId: seasonId });
  const { mutateAsync: createImageMutateAsync, isPending: isCreateImageLoading } = useCreateImage();
  const { mutateAsync: createImageByUrlMutateAsync, isPending: isCreateImageByUrlLoading } = useCreateImageByUrl();

  useEffect(() => {
    if (nextSeasonNumberData) {
      setFormValue("number", nextSeasonNumberData.number);
    }
  }, [nextSeasonNumberData]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue: setFormValue,
    watch,
  } = useForm<CreateEpisodeFormFieldType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      plotSummary: DEFAULT_PLOT_SUMMARY,
      releaseDate: DEFAULT_RELEASE_DATE,
      number: 1,
    },
  });

  const handleOnThumbnailSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    setFormValue("thumbnailUrl", await extractImageUrl(image));
    const result = await createImageMutateAsync({ Base64: imageBase64, Mime: mimeType, Variant: ImageVariantEnum.THUMBNAIL });
    setFormValue("imageId", result?.ID);
  };

  const handleOnSubmit = async () => {
    if (!watch("imageId") && watch("thumbnailUrl")) {
      const result = await createImageByUrlMutateAsync({
        Url: watch("thumbnailUrl"),
        Variant: ImageVariantEnum.THUMBNAIL,
      });
      setFormValue("imageId", result.ID);
    }
    handleSubmit(onSave)();
  };

  return (
    <Stack direction={"row"} gap={2} height={"100%"}>
      <Stack width={"100%"} gap={2}>
        <Stack direction={"row"} justifyContent={"end"}>
          <Button variant="text">{t("Feature.VideoUpload.EpisodeUploadModal.reUsePrevious")}</Button>
        </Stack>
        <Form onSubmit={handleOnSubmit} gap={2}>
          <Stack direction={{ md: "row", sm: "column" }} gap={2}>
            <TextField register={register} name="title" label="Title" helperText={errors.title?.message} error={!!errors.title} fullWidth required />
            <Controller control={control} name="releaseDate" rules={{ required: true }} render={({ field }) => <DatePickerModal onChange={date => field.onChange(date?.getTime())} inputRef={field.ref} value={new Date(field.value)} label="Release date" views={["year", "month"]} fullWidth />} />
            <Popover open={!!episodeNumberPopoverAnchorEl} anchorEl={episodeNumberPopoverAnchorEl} onClose={() => setEpisodeNumberPopoverAnchorEl(null)}>
              <TextField register={register} name={"number"} autoFocus type="number" />
            </Popover>
            <Button onClick={event => setEpisodeNumberPopoverAnchorEl(event.currentTarget)} color={errors.number ? "error" : "primary"}>
              {watch("number")}
            </Button>
          </Stack>
          <TextField register={register} name="plotSummary" label="Plot summary" helperText={errors.plotSummary?.message} error={!!errors.plotSummary} multiline rows={5} fullWidth required />
          <Stack direction={"row"} alignItems={"flex-end"} gap={2}>
            <ImageUploadComponent isLoading={isCreateImageLoading} onImageSelect={handleOnThumbnailSelect} title={t("Feature.VideoUpload.EpisodeUploadModal.imageUploadComponentTitle")} />
            <TextField register={register} name="thumbnailUrl" size="small" endIcon={<AttachFileIcon fontSize="inherit" loading={isCreateImageByUrlLoading} />} label="Image url" />
          </Stack>
          <DevTool control={control} />
        </Form>
        <Stack direction={"row"} mt={"auto"} justifyContent={"end"} gap={1}>
          <Button variant="text">{t("Feature.VideoUpload.EpisodeUploadModal.cancel")}</Button>
          <Button loading={isLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleOnSubmit} disabled={isSaveButtonDisabled}>
            {t("Feature.VideoUpload.EpisodeUploadModal.next")}
          </Button>
        </Stack>
      </Stack>
      <Hidden mdDown>
        <EpisodeCardComponent title={watch("title")} plotSummary={watch("plotSummary")} thumbnail={watch("thumbnailUrl")} />
      </Hidden>
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.number().required("Release date is required"),
  number: yup.number().required("Episode number must one or up").min(1),
});
