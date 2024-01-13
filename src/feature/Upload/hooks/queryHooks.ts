import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CreateEpisodeInput, CreateImageByUrlInput, CreateImageInput, CreateMovieInput, EpisodeIdOutput, GetImageByMediaIdParams, GetManagerSeriesWithImageOutput, GetNextEpisodeNumberOutput, GetNextEpisodeNumberParams, GetSeasonBySeriesIdParams, GetUploadVideoSignedUrlInput, ImageIdOutput, Season, UploadVideoSignedUrlOutput } from "zgaya.hub-client-types/lib";
import { Image } from "zgaya.hub-client-types/lib/videoHub";

import { useCreateImageError } from "./errorHooks";
import { UploadVideoOnAwsS3Input } from "./queryHooks.types";

export function useGetUploadVideoSignedUrl() {
  const [apiCaller, status] = useMutation<{ getUploadVideoSignedUrl: UploadVideoSignedUrlOutput }, { input: GetUploadVideoSignedUrlInput }>(
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
  const [apiCaller, status] = useMutation<{ getSeasonBySeriesId: Season[] }, { param: GetSeasonBySeriesIdParams }>(
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
  const mutateAsync = async (param: GetSeasonBySeriesIdParams) => {
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

export function useCreateMovie() {
  const [apiCaller, status] = useMutation<{ createEpisode: EpisodeIdOutput }, { input: CreateMovieInput }>(
    gql`
      mutation ($input: CreateMovieInput!) {
        createMovie(CreateMovieInput: $input) {
          ID
        }
      }
    `
  );
  const mutateAsync = async (input: CreateMovieInput) => {
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
  const imageError = useCreateImageError();
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
      imageError.handleError(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.createImage, isPending: status.loading };
}

export function useCreateImageByUrl() {
  const imageError = useCreateImageError();
  const [apiCaller, status] = useMutation<{ createImageByUrl: ImageIdOutput }, { input: CreateImageByUrlInput }>(
    gql`
      mutation ($input: CreateImageByUrlInput!) {
        createImageByUrl(CreateImageByUrlInput: $input) {
          ID
        }
      }
    `
  );
  const mutateAsync = async (input: CreateImageByUrlInput) => {
    try {
      const result = await apiCaller({ variables: { input } });
      return result.data?.createImageByUrl;
    } catch (error) {
      imageError.handleError(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.createImageByUrl, isPending: status.loading };
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

export function useGetManagerSeriesWithImage() {
  //TODO: this return type will change
  const status = useQuery<{ getManagerSeriesWithImage: GetManagerSeriesWithImageOutput[] }>(
    gql`
      query GetManagerSeriesWithImage {
        getManagerSeriesWithImage {
          ID
          isFree
          priceInDollar
          imageUrl
          plotSummary
          releaseDate
          title
        }
      }
    `
  );
  return { ...status, isLoading: status.loading, data: status.data?.getManagerSeriesWithImage };
}

export function useUploadVideoOnAwsS3() {
  const [isPending, setIsPending] = useState(false);
  const [progress, setProgress] = useState(0);
  const xhr = new XMLHttpRequest();

  const onProgress = (event: ProgressEvent) => {
    if (event.lengthComputable) {
      const percentComplete = (event.loaded / event.total) * 100;
      setProgress(+percentComplete.toFixed(1));
    }
  };

  useEffect(() => {
    xhr.upload.onprogress = onProgress;
  }, [xhr.upload]);

  const mutateAsync = async (input: UploadVideoOnAwsS3Input) => {
    try {
      setIsPending(true);
      xhr.open("PUT", input.SignedUrl);
      xhr.send(input.VideoBlob);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsPending(false);
      setProgress(0);
    }
  };

  return { mutateAsync, isPending, progress };
}

export function useGetVideoResourceById(param: GetImageByMediaIdParams) {
  const status = useQuery<{ getImageByMediaId: Image }>(
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
