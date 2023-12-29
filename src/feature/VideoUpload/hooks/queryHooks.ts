import { gqlRequest } from "@/api/gqlRequest";
import useGqlError, { ErrorResponse } from "@/context/GqlErrorContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateEpisodeInput, CreateMediaImageInput, CreateMediaImageOutput, GetManagerSeriesWithImageAndBasicInfoOutput, GetSeasonBySeriesIdInput, GetSeasonBySeriesIdOutput, GetUploadVideoSignedUrlInput, GetUploadVideoSignedUrlOutput, UploadVideoOnAwsS3Input } from "./queryHooks.types";

export function useGetUploadVideoSignedUrl() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (input: GetUploadVideoSignedUrlInput) => {
      const result = await gqlRequest<{ getUploadVideoSignedUrl: GetUploadVideoSignedUrlOutput }>(
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
      return result;
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
        `query GetManagerSeriesWithImageAndBasicInfo{
          getManagerSeriesWithImageAndBasicInfo{
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
        }`
      );
      return result.getManagerSeriesWithImageAndBasicInfo;
    },
  });
}

export function useGetSeasonBySeriesId() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (param: GetSeasonBySeriesIdInput) => {
      const result = await gqlRequest<{ getSeasonBySeriesId: GetSeasonBySeriesIdOutput[] }>(
        `query($param: GetSeasonBySeriesIdParams!) {
          getSeasonBySeriesId(GetSeasonBySeriesIdParams: $param) {
            ID
            seasonNumber
            mediaBasicInfo {
              mediaTitle
              ID
              mediaPlotSummary
            }
          }
        }`,
        { param }
      );
      return result.getSeasonBySeriesId;
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
      const result = await gqlRequest<{ createEpisode: CommonSuccessOutput }>(
        `mutation($input: CreateEpisodeInput!) {
          createEpisode(CreateEpisodeInput: $input) {
            isSuccess
          }
        }`,
        { input }
      );
      return result.createEpisode;
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
      const result = await gqlRequest<{ createMediaImage: CreateMediaImageOutput }>(
        `mutation($input: CreateMediaImageInput!) {
          createMediaImage(CreateMediaImageInput: $input) {
            mediaImageId
          }
        }`,
        { input }
      );
      return result.createMediaImage;
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}
