import Page from "@/components/Page";
import { useState } from "react";
import { extractImageBase64, extractImageMetadata, extractImageUrl } from "metalyzer";
import { useCreateMediaImage, useCreateSeries } from "../hooks/queryHooks";
import { MediaImageTypeEnum } from "@/types/enum";
import { CardMedia, Grid, SxProps } from "@mui/material";
import SeriesCreateForm, { SeriesCreateFormFieldType } from "../components/SeriesCreateForm";
import SeriesImageSelectComponent from "../components/SeriesImageSelectComponent";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

export default function SeriesManagementScreen() {
  const [backDropUrl, senBackDropUrl] = useState("");
  const [mediaImageId, setMediaImageId] = useState("");
  const { mutateAsync: createSeriesMutateAsync, isPending: isCreateSeriesLoading } = useCreateSeries();
  const { mutateAsync: createMediaImageMutateAsync, isPending: isCreateMediaImageLoading } = useCreateMediaImage();

  const {
    control,
    formState: { errors },
    register,
  } = useForm<SeriesCreateFormFieldType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      plotSummary: DUMMY_PLOT_SUMMARY,
      releaseDate: new Date().getTime(),
    },
  });

  const handleOnBackDropSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    const result = await createMediaImageMutateAsync({ MediaImageBase64: imageBase64, MediaImageMime: mimeType, MediaImageType: MediaImageTypeEnum.BACKDROP });
    setMediaImageId(result.createMediaImage.mediaImageId);
    senBackDropUrl(await extractImageUrl(image));
  };

  const handleOnCreateEpisode = (input: SeriesCreateFormFieldType) => {
    createSeriesMutateAsync({
      MediaImageId: mediaImageId,
      MediaBasicInfo: {
        PlotSummary: input.plotSummary,
        Title: input.title,
        ReleaseDate: input.releaseDate,
      },
    });
  };

  const cardMediaStyle = useThemeStyles<SxProps>((theme) => ({
    height: "100%",
    minHeight: theme.spacing(16),
    backgroundSize: "contain",
    backgroundPosition: "top",
  }));

  return (
    <Page>
      <Grid container justifyContent={"space-between"} rowGap={4}>
        <Grid xs={12} item lg={5.9}>
          <SeriesCreateForm onSave={handleOnCreateEpisode} />
        </Grid>
        <Grid container justifyContent={"space-between"} rowGap={4} xs={12} lg={5.9}>
          <Grid xs={12} item lg={5.9}>
            <SeriesImageSelectComponent onImageDrop={handleOnBackDropSelect} isLoading={isCreateMediaImageLoading} />
          </Grid>
          <Grid xs={12} item lg={5.9}>
            <CardMedia sx={cardMediaStyle} image={backDropUrl} />
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.string().required("Release date is required"),
});
