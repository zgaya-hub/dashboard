import { useState } from "react";
import { CreateEpisodeInput, CreateMediaImageInput, MediaImageIdOutput, GetManagerSeriesWithImageAndBasicInfoOutput, GetSeasonBySeriesIdInput, GetSeasonBySeriesIdOutput, GetUploadVideoSignedUrlInput, GetUploadVideoSignedUrlOutput, UploadVideoOnAwsS3Input, GetNextEpisodeNumberParams, GetNextEpisodeNumberOutput } from "./queryHooks.types";
import { gql, useMutation, useQuery } from "@apollo/client";

export function useGetUploadVideoSignedUrl() {
  const [apiCaller, status] = useMutation<{ getUploadVideoSignedUrl: GetUploadVideoSignedUrlOutput }, { input: GetUploadVideoSignedUrlInput }>(
    gql`
      mutation ($input: GetUploadVideoSignedUrlInput!) {
        getUploadVideoSignedUrl(GetUploadVideoSignedUrlInput: $input) {
          signedUrl
          signedUrlKeyId
          videoId
        }
      }
    `
  );
  const mutateAsync = async (input: GetUploadVideoSignedUrlInput) => {
    try {
      const result = await apiCaller({ variables: { input } });
      return result.data?.getUploadVideoSignedUrl;
    } catch (error) {
      console.error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.getUploadVideoSignedUrl, isPending: status.loading };
}

export function useUploadVideoOnAwsS3() {
  const [loading, setLoading] = useState(false);
  const mutateAsync = async (input: UploadVideoOnAwsS3Input) => {
    setLoading(true);
    const result = await fetch(input.SignedUrl, {
      method: "PUT",
      body: input.VideoBlob,
      headers: {
        "Content-Type": "video/*",
      },
    });
    setLoading(false);
    return result;
  };

  return { mutateAsync, isPending: loading };
}

export function useGetSeasonBySeriesId() {
  // TODO: this is actually a query in BE but here due to Error i have change it into mutation it will change in the future
  const [apiCaller, status] = useMutation<{ getSeasonBySeriesId: GetSeasonBySeriesIdOutput[] }, { param: GetSeasonBySeriesIdInput }>(
    gql`
      mutation ($param: GetSeasonBySeriesIdParams!) {
        getSeasonBySeriesId(GetSeasonBySeriesIdParams: $param) {
          ID
          number
          mediaBasicInfo {
            title
            ID
            plotSummary
          }
        }
      }
    `
  );
  const mutateAsync = async (param: GetSeasonBySeriesIdInput) => {
    try {
      const result = await apiCaller({ variables: { param } });
      return result.data?.getSeasonBySeriesId;
    } catch (error) {
      console.error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.getSeasonBySeriesId, isPending: status.loading };
}

export function useCreateEpisode() {
  const [apiCaller, status] = useMutation<{ createEpisode: CommonSuccessOutput }, { input: CreateEpisodeInput }>(
    gql`
      mutation ($input: CreateEpisodeInput!) {
        createEpisode(CreateEpisodeInput: $input) {
          isSuccess
        }
      }
    `
  );
  const mutateAsync = async (input: CreateEpisodeInput) => {
    try {
      const result = await apiCaller({ variables: { input } });
      return result.data?.createEpisode;
    } catch (error) {
      console.error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.createEpisode, isPending: status.loading };
}

export function useCreateMediaImage() {
  const [apiCaller, status] = useMutation<{ createMediaImage: MediaImageIdOutput }, { input: CreateMediaImageInput }>(
    gql`
      mutation ($input: CreateMediaImageInput!) {
        createMediaImage(CreateMediaImageInput: $input) {
          ID
        }
      }
    `
  );
  const mutateAsync = async (input: CreateMediaImageInput) => {
    try {
      const result = await apiCaller({ variables: { input } });
      return result.data?.createMediaImage;
    } catch (error) {
      console.error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.createMediaImage, isPending: status.loading };
}

export function useGetNextEpisodeNumber(param: GetNextEpisodeNumberParams) {
  const status = useQuery<{ getNextEpisodeNumber: GetNextEpisodeNumberOutput }>(
    gql`
      query ($param: GetNextEpisodeNumberParams!) {
        getNextEpisodeNumber(GetNextEpisodeNumberParams: $param) {
          number
        }
      }
    `,
    {
      variables: { param },
    }
  );
  return { ...status, isLoading: status.loading, data: status.data?.getNextEpisodeNumber };
}

export function useGetManagerSeriesWithImageAndBasicInfo() {
  const status = useQuery<{ getManagerSeriesWithImageAndBasicInfo: GetManagerSeriesWithImageAndBasicInfoOutput[] }>(
    gql`
      query GetManagerSeriesWithImageAndBasicInfo {
        getManagerSeriesWithImageAndBasicInfo {
          ID
          isFree
          priceInDollar
          mediaImage {
            ID
            variant
            url
          }
          mediaBasicInfo {
            plotSummary
            releaseDate
            title
            ID
          }
        }
      }
    `
  );
  return { ...status, isLoading: status.loading, data: status.data?.getManagerSeriesWithImageAndBasicInfo };
}
