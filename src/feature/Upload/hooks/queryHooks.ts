import { useState } from "react";
import { CreateEpisodeInput, CreateImageInput, ImageIdOutput, GetManagerSeriesWithImageAndBasicInfoOutput, GetSeasonBySeriesIdInput, GetSeasonBySeriesIdOutput, GetUploadVideoSignedUrlInput, GetUploadVideoSignedUrlOutput, UploadVideoOnAwsS3Input, GetNextEpisodeNumberParams, GetNextEpisodeNumberOutput, EpisodeIdOutput, CreateExternalLinkInput, GetSharelinkInput, GetImageByMediaIdParams } from "./queryHooks.types";
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
      throw new Error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.getUploadVideoSignedUrl, isPending: status.loading };
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
      throw new Error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.getSeasonBySeriesId, isPending: status.loading };
}

export function useCreateEpisode() {
  const [apiCaller, status] = useMutation<{ createEpisode: EpisodeIdOutput }, { input: CreateEpisodeInput }>(
    gql`
      mutation ($input: CreateEpisodeInput!) {
        createEpisode(CreateEpisodeInput: $input) {
          ID
        }
      }
    `
  );
  const mutateAsync = async (input: CreateEpisodeInput) => {
    try {
      const result = await apiCaller({ variables: { input } });
      return result.data?.createEpisode;
    } catch (error) {
      throw new Error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.createEpisode, isPending: status.loading };
}

export function useCreateImage() {
  const [apiCaller, status] = useMutation<{ createImage: ImageIdOutput }, { input: CreateImageInput }>(
    gql`
      mutation ($input: CreateImageInput!) {
        createImage(CreateImageInput: $input) {
          ID
        }
      }
    `
  );
  const mutateAsync = async (input: CreateImageInput) => {
    try {
      const result = await apiCaller({ variables: { input } });
      return result.data?.createImage;
    } catch (error) {
      throw new Error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.createImage, isPending: status.loading };
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
          image {
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

export function useGetSharelink(input: GetSharelinkInput) {
  const status = useQuery<{ getManagerSeriesWithImageAndBasicInfo: GetManagerSeriesWithImageAndBasicInfoOutput[] }>(
    gql`
      query GetManagerSeriesWithImageAndBasicInfo {
        getManagerSeriesWithImageAndBasicInfo {
          ID
          isFree
          priceInDollar
          image {
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

export function useGetImageByMediaId(param: GetImageByMediaIdParams) {
  const status = useQuery<{ getImageByMediaId: ImageEntityType }>(
    gql`
      query ($param: GetImageByMediaIdParams!) {
        getImageByMediaId(GetImageByMediaIdParams: $param) {
          ID
          variant
          url
        }
      }
    `,
    {
      variables: { param },
    }
  );
  return { ...status, isLoading: status.loading, data: status.data?.getImageByMediaId };
}

export function useUploadVideoOnAwsS3() {
  const [loading, setLoading] = useState(false);

  const mutateAsync = async (input: UploadVideoOnAwsS3Input) => {
    try {
      setLoading(true);

      const result = await fetch(input.SignedUrl, {
        method: "PUT",
        body: input.VideoBlob,
      });

      if (!result.ok) {
        throw new Error(`Failed to upload video. Status: ${result.status}`);
      }

      return result;
    } catch (error) {
      console.log(error);

      throw new Error(`Error uploading video: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { mutateAsync, isPending: loading };
}
