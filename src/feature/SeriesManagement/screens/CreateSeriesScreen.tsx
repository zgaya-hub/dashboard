import Page from "@/components/Page";
import CreateSeriesForm, { CreateSeriesFormFieldType } from "../components/CreateSeriesForm";
import { useState } from "react";
import { extractImageBase64, extractImageMetadata, extractImageUrl } from "metalyzer";
import { useCreateMediaImage, useCreateSeries } from "../hooks/queryHooks";
import { MediaImageTypeEnum } from "@/types/enum";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import Grid from "@mui/material/Grid";
import { SxProps } from "@mui/material";

export default function SeriesManagementScreen() {
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [mediaImageId, setMediaImageId] = useState("");
  const { mutateAsync: createSeriesMutateAsync, isPending: isCreateSeriesLoading } = useCreateSeries();
  const { mutateAsync: createMediaImageMutateAsync, isPending: isCreateMediaImageLoading } = useCreateMediaImage();

  const handleOnThumbnailSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    setThumbnailUrl(await extractImageUrl(image));
    const result = await createMediaImageMutateAsync({ MediaImageBase64: imageBase64, MediaImageMime: mimeType, MediaImageType: MediaImageTypeEnum.THUMBNAIL });
    setMediaImageId(result.createMediaImage.mediaImageId);
  };

  const handleOnCreateEpisode = (input: CreateSeriesFormFieldType) => {
    createSeriesMutateAsync({
      MediaImageId: mediaImageId,
      MediaBasicInfo: {
        PlotSummary: input.plotSummary,
        Title: input.title,
        ReleaseDate: input.releaseDate,
      },
    });
  };

  const formContainerStyle = useThemeStyles<SxProps>((theme) => ({
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
  }));

  return (
    <Page>
      <Grid container>
        <Grid xs={12} md={6} sx={formContainerStyle}>
          <CreateSeriesForm thumbnailUrl={thumbnailUrl} onSave={handleOnCreateEpisode} onThumbnailSelect={handleOnThumbnailSelect} isLoading={isCreateSeriesLoading || isCreateMediaImageLoading} />
        </Grid>
      </Grid>
    </Page>
  );
}
