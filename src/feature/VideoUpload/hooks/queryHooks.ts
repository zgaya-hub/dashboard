import { gqlRequest } from "@/api/gqlRequest";
import useGqlError, { ErrorResponse } from "@/context/GqlErrorContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetManagerSeriesWithImageAndBasicInfo, GetUploadVideoSignedUrlInput, GetUploadVideoSignedUrlOutput, UploadVideoOnAwsS3Input } from "./queryHooks.types";

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

export function useGetManagerSeriesWithImageAndBasicInfo() {
  return useQuery({
    queryKey: [""],
    queryFn: async () => {
      const result = await gqlRequest<{ getManagerSeriesWithImageAndBasicInfo: GetManagerSeriesWithImageAndBasicInfo[] }>(
        `query GetManagerSeriesWithImageAndBasicInfo {
          getManagerSeriesWithImageAndBasicInfo {
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
    /*   onError: (error) => {
      showGqlError(error.response);
    }, */
  });
}

export function () {
  return useQuery({
    Key: [""],
    Fn: async () => {
      const result = await gqlRequest<{ getManagerSeriesWithImageAndBasicInfo: GetManagerSeriesWithImageAndBasicInfo[] }>(
        `
        
      }
        `,
        { input }        
      );
      return result.getManagerSeriesWithImageAndBasicInfo;
    },
  });
}


export function useGetSeasonBySeriesId() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (Params: GetUploadVideoSignedUrlInput) => {
      return gqlRequest<{ getUploadVideoSignedUrl: GetUploadVideoSignedUrlOutput }>(
        `query GetSeasonBySeriesId($seriesId: ID!) {
          getSeasonBySeriesId(GetSeasonBySeriesIdParams: { SeriesId: $seriesId }) {
            ID
            seasonNo
            mediaBasicInfo {
              mediaTitle
              ID
              mediaPlotSummary
            }
          }
        }`,
        { Params }
      );
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}
