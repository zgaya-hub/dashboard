import Page from "@/components/Page";
import { useState } from "react";
import { extractImageBase64, extractImageMetadata, extractImageUrl } from "metalyzer";
import { useCreateMediaImage, useCreateSeries } from "../hooks/queryHooks";
import { MediaImageTypeEnum } from "@/types/enum";
import { Grid } from "@mui/material";
import SeriesBasicInformationForm, { SeriesBasicInformationFormFieldType } from "../components/SeriesBasicInformationForm";
import SeriesAdditionalInformationForm from "../components/SeriesAdditionalInformationForm";
import SeriesImageSelectComponent from "../components/SeriesImageSelectComponent";
import { CircularProgress } from "@/components/ProgressBars";

export default function SeriesManagementScreen() {
  const [thumbnailUrl, senBackDropUrl] = useState("");
  const [mediaImageId, setMediaImageId] = useState("");
  const { mutateAsync: createSeriesMutateAsync, isPending: isCreateSeriesLoading } = useCreateSeries();
  const { mutateAsync: createMediaImageMutateAsync, isPending: isCreateMediaImageLoading } = useCreateMediaImage();

  const handleOnBackDropSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    senBackDropUrl(await extractImageUrl(image));
    const result = await createMediaImageMutateAsync({ MediaImageBase64: imageBase64, MediaImageMime: mimeType, MediaImageType: MediaImageTypeEnum.THUMBNAIL });
    setMediaImageId(result.createMediaImage.mediaImageId);
  };

  const handleOnCreateEpisode = (input: SeriesBasicInformationFormFieldType) => {
    createSeriesMutateAsync({
      MediaImageId: mediaImageId,
      MediaBasicInfo: {
        PlotSummary: input.plotSummary,
        Title: input.title,
        ReleaseDate: input.releaseDate,
      },
    });
  };

  return (
    <Page>
      <Grid container justifyContent={"space-between"} rowGap={4}>
        <Grid xs={12} item lg={5.9}>
          <SeriesBasicInformationForm onSave={handleOnCreateEpisode} isLoading={isCreateSeriesLoading} />
        </Grid>
        <Grid xs={12} item lg={5.9}>
          <SeriesAdditionalInformationForm onSave={handleOnCreateEpisode} isLoading={isCreateSeriesLoading} />
        </Grid>
        <Grid container justifyContent={"space-between"} rowGap={4} xs={12} lg={5.9}>
          <Grid xs={12} item lg={5.9}>
            <SeriesImageSelectComponent onImageDrop={handleOnBackDropSelect} isLoading={isCreateMediaImageLoading} />
          </Grid>
        </Grid>
        <Grid xs={12} container lg={5.9}></Grid>
      </Grid>
    </Page>
  );
}
