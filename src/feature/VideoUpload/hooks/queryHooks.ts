import { gqlRequest } from "@/api/gqlRequest";
import useGqlError, { ErrorResponse } from "@/context/GqlErrorContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateEpisodeInput, CreateMediaImageInput, CreateMediaImageOutput, GetManagerSeriesWithImageAndBasicInfoOutput, GetSeasonBySeriesIdInput, GetSeasonBySeriesIdOutput, GetUploadVideoSignedUrlInput, GetUploadVideoSignedUrlOutput, UploadVideoOnAwsS3Input } from "./queryHooks.types";
import { MediaImageTypeEnum } from "../enum";

export function useGetUploadVideoSignedUrl() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (input: GetUploadVideoSignedUrlInput) => {
      return gqlRequest<{ getUploadVideoSignedUrl: GetUploadVideoSignedUrlOutput }>(
        `
          mutation($input: GetUploadVideoSignedUrlInput!) {
            getUploadVideoSignedUrl(GetUploadVideoSignedUrlInput: $input) {
              SignedUrl
              SignedUrlKeyId
              VideoId
            }
          }
        `,
        { input }
      );
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}

export function useUploadVideoOnAwsS3() {
  const { showGqlError } = useGqlError();

  return useMutation({
    mutationFn: async (input: UploadVideoOnAwsS3Input) => {
      fetch(input.SignedUrl, {
        method: "PUT",
        body: input.VideoBlob,
        headers: {
          "Content-Type": "video/*",
        },
      });
    },
    onError: (error: ErrorResponse) => {
      showGqlError(error);
    },
  });
}

export function useGetManagerSeries() {
  return useQuery({
    queryKey: [""],
    queryFn: async () => {
      const result = await gqlRequest<{ getManagerSeriesWithImageAndBasicInfo: GetManagerSeriesWithImageAndBasicInfoOutput[] }>(
        `query GetManagerSeriesWithImageAndBasicInfo($input: GetManagerSeriesWithImageAndBasicInfoInput!) {
          getManagerSeriesWithImageAndBasicInfo(GetManagerSeriesWithImageAndBasicInfoInput: $input) {
            ID
            seriesIsFree
            seriesPriceInDollar
            mediaImage {
              ID
              mediaImageType
              mediaImageUrl
            }
            mediaBasicInfo {
              mediaPlotSummary
              mediaReleaseDate
              mediaTitle
              ID
            }
          }
        }`,
        { input: { MediaImageType: MediaImageTypeEnum.THUMBNAIL } }
      );
      return result.getManagerSeriesWithImageAndBasicInfo;
    },
  });
}

export function useGetSeasonBySeriesId() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (param: GetSeasonBySeriesIdInput) => {
      return gqlRequest<{ getSeasonBySeriesId: GetSeasonBySeriesIdOutput[] }>(
        `query($param: GetSeasonBySeriesIdParams!) {
          getSeasonBySeriesId(GetSeasonBySeriesIdParams: $param) {
            ID
            seasonNo
            mediaBasicInfo {
              mediaTitle
              ID
              mediaPlotSummary
            }
          }
        }`,
        { param }
      );
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}

export function useCreateEpisode() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (input: CreateEpisodeInput) => {
      return gqlRequest<{ createEpisode: CommonSuccessOutput }>(
        `mutation($input: CreateEpisodeInput!) {
          createEpisode(CreateEpisodeInput: $input) {
            isSuccess
          }
        }`,
        { input }
      );
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}

export function useCreateMediaImage() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (input: CreateMediaImageInput) => {
      return gqlRequest<{ createMediaImage: CreateMediaImageOutput }>(
        `mutation($input: CreateMediaImageInput!) {
          createMediaImage(CreateMediaImageInput: $input) {
            mediaImageId
          }
        }`,
        { input }
      );
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}
