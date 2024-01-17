import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Typography, Paper } from "@mui/material";
import { extractImageBase64, extractImageMetadata } from "metalyzer";
import * as yup from "yup";
import { ImageVariantEnum } from "zgaya.hub-client-types/lib";

import Button from "@/components/Button";
import { SaveIcon } from "@/components/icons";

import SeriesCreateForm from "../components/SeriesCreateForm";
import { DEFAULT_PLOT_SUMMARY, DEFAULT_RELEASE_DATE } from "../constants";
import { useCreateImage, useCreateSeries } from "../hooks";
import { SeriesCreateFormFieldInterface } from "../types";

export default function SeriesCreateScreen() {
  const { t } = useTranslation();
  const { mutateAsync: createSeriesMutateAsync, isPending: isCreateSeriesLoading } = useCreateSeries();
  const { mutateAsync: createImageMutateAsync, isPending: isCreateImageLoading } = useCreateImage();

  const {
    control,
    formState: { errors },
    register,
    handleSubmit: handleOnSubmit,
    setValue: setCreateSeriesFormValue,
  } = useForm<SeriesCreateFormFieldInterface>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      plotSummary: DEFAULT_PLOT_SUMMARY,
      releaseDate: DEFAULT_RELEASE_DATE,
    },
  });

  const handleOnImageSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    const result = await createImageMutateAsync({ Base64: imageBase64, Mime: mimeType, Variant: ImageVariantEnum.BACKDROP });
    if (result) {
      setCreateSeriesFormValue("imageId", result.ID);
    }
  };

  const handleOnCreateEpisode = async (input: SeriesCreateFormFieldInterface) => {
    await createSeriesMutateAsync({
      ImageId: input.imageId,
      PlotSummary: input.plotSummary,
      Title: input.title,
      ReleaseDate: +input.releaseDate,
      AdditionalInfo: {},
    });
    window.close();
  };

  return (
    <Stack>
      <Stack component={ Paper } p={ 2 } justifyContent={ "space-between" } direction={ "row" } gap={ 1 } alignItems={ "center" }>
        <Typography variant="h5">{ t("Feature.Quick.SeriesCreateScreen.createASeries") }</Typography>
        <Stack direction={ "row" } gap={ 1 }>
          <Button variant="text" onClick={ () => window.close() }>
            { t("Feature.Quick.SeriesCreateScreen.back") }
          </Button>
          <Button loading={ isCreateSeriesLoading } endIcon={ <SaveIcon /> } variant="contained" onClick={ handleOnSubmit(handleOnCreateEpisode) }>
            { t("Feature.Quick.SeriesCreateScreen.save") }
          </Button>
        </Stack>
      </Stack>
      <SeriesCreateForm control={ control } errors={ errors } register={ register } onImageSelect={ handleOnImageSelect } isLoading={ isCreateImageLoading } />
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.string().required("Release date is required"),
  imageId: yup.string().required("Backdrop is required"),
});
