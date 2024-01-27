import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Typography, Paper, Toolbar } from "@mui/material";
import { extractImageBase64, extractImageMetadata } from "metalyzer";
import * as yup from "yup";
import { ImageVariantEnum } from "zgaya.hub-client-types/lib";

import Button from "@/components/Button";
import { SaveIcon } from "@/components/icons";

import SeasonCreateForm from "../components/SeasonCreateForm";
import { DEFAULT_PLOT_SUMMARY, DEFAULT_RELEASE_DATE } from "../constants";
import { useCreateImage, useCreateSeason, useGetNextSeasonNumber } from "../hooks";
import { SeasonCreateFormFieldInterface } from "../types";

export default function SeasonCreateScreen() {
  const { t } = useTranslation();
  const params = useParams();
  const { data: nextSeasonNumberData } = useGetNextSeasonNumber({ SeriesId: params.seriesId! });
  const { mutateAsync: createSeasonMutateAsync, isPending: isCreateSeasonLoading } = useCreateSeason();
  const { mutateAsync: createImageMutateAsync, isPending: isCreateImageLoading } = useCreateImage();

  useEffect(() => {
    if (nextSeasonNumberData) {
      setSeasonFormValue("number", nextSeasonNumberData.number);
    }
  }, [nextSeasonNumberData]);

  const {
    control: formControl,
    formState: { errors: formErrors },
    register: formRegister,
    watch: seasonFormWatch,
    handleSubmit: handleOnSubmit,
    setValue: setSeasonFormValue,
  } = useForm<SeasonCreateFormFieldInterface>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      plotSummary: DEFAULT_PLOT_SUMMARY,
      releaseDate: DEFAULT_RELEASE_DATE,
      number: nextSeasonNumberData?.number,
    },
  });

  const handleOnImageSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    const result = await createImageMutateAsync({ Base64: imageBase64, Mime: mimeType, Variant: ImageVariantEnum.BACKDROP });
    if (result) {
      setSeasonFormValue("imageId", result.ID);
    }
  };

  const handleOnCreateEpisode = async (input: SeasonCreateFormFieldInterface) => {
    await createSeasonMutateAsync({
      ImageId: input.imageId,
      PlotSummary: input.plotSummary,
      Title: input.title,
      ReleaseDate: +input.releaseDate,
      Number: input.number,
      SeriesId: params.seriesId!,
    });
    window.close();
  };

  return (
    <Stack>
      <Stack component={Paper} p={2} justifyContent={"space-between"} direction={"row"} gap={1} alignItems={"center"}>
        <Typography variant="h5">{t("Feature.Quick.SeasonCreateScreen.createASeason")}</Typography>
        <Stack direction={"row"} gap={1}>
          <Button variant="text">{t("Feature.Quick.SeasonCreateScreen.back")}</Button>
          <Button loading={isCreateSeasonLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleOnSubmit(handleOnCreateEpisode)}>
            {t("Feature.Quick.SeasonCreateScreen.save")}
          </Button>
        </Stack>
      </Stack>
      <SeasonCreateForm formControl={formControl} formErrors={formErrors} formRegister={formRegister} onImageSelect={handleOnImageSelect} isLoading={isCreateImageLoading} formWatch={seasonFormWatch} />
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  number: yup.number().required("Plot summary is required").min(1),
  releaseDate: yup.number().required("Release date is required"),
  imageId: yup.string().required("Backdrop is required"),
});
