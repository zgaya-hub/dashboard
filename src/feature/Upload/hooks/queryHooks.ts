import { useEffect, useRef, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CreateEpisodeInput, CreateImageByUrlInput, CreateImageInput, CreateMovieInput, EpisodeIdOutput, GetManagerSeriesWithImageOutput, GetNextEpisodeNumberOutput, GetNextEpisodeNumberParams, GetSeasonBySeriesIdParams, GetUploadVideoSignedUrlInput, ImageIdOutput, Season, UploadVideoSignedUrlOutput } from "zgaya.hub-client-types/lib";

import { useErrorHandler } from "./useErrorHandler";
import { UploadVideoOnAwsS3Input } from "./queryHooks.types";

export function useGetUploadVideoSignedUrl() {
  const { handleError } = useErrorHandler();
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
      handleError(error);
      throw new Error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.getUploadVideoSignedUrl, isPending: status.loading };
}

export function useGetSeasonBySeriesId() {
  const { handleError } = useErrorHandler();
  // TODO: this is actually a query in BE but here due to Error i have change it into mutation it will change in the future
  const [apiCaller, status] = useMutation<{ getSeasonBySeriesId: Season[] }, { params: GetSeasonBySeriesIdParams }>(
    gql`
      mutation ($params: GetSeasonBySeriesIdParams!) {
        getSeasonBySeriesId(GetSeasonBySeriesIdParams: $params) {
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
  const mutateAsync = async (params: GetSeasonBySeriesIdParams) => {
    try {
      const result = await apiCaller({ variables: { params } });
      return result.data?.getSeasonBySeriesId;
    } catch (error) {
      handleError(error);
      throw new Error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.getSeasonBySeriesId, isPending: status.loading };
}

export function useCreateEpisode() {
  const { handleError } = useErrorHandler();
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
      handleError(error);
      throw new Error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.createEpisode, isPending: status.loading };
}

export function useCreateMovie() {
  const { handleError } = useErrorHandler();
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
      handleError(error);
      throw new Error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.createEpisode, isPending: status.loading };
}

export function useCreateImage() {
  const { handleError } = useErrorHandler();
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
      handleError(error);
      throw new Error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.createImage, isPending: status.loading };
}

export function useCreateImageByUrl() {
  const { handleError } = useErrorHandler();
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
      handleError(error);
      throw new Error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.createImageByUrl, isPending: status.loading };
}

export function useGetNextEpisodeNumber(params: GetNextEpisodeNumberParams) {
  const { handleError } = useErrorHandler();
  const status = useQuery<{ getNextEpisodeNumber: GetNextEpisodeNumberOutput }>(
    gql`
      query ($params: GetNextEpisodeNumberParams!) {
        getNextEpisodeNumber(GetNextEpisodeNumberParams: $params) {
          number
        }
      }
    `,
    {
      variables: { params },
    }
  );

  if (status.error) {
    handleError(status.error);
  }

  return { ...status, isLoading: status.loading, data: status.data?.getNextEpisodeNumber };
}

export function useGetManagerSeriesWithImage() {
  const { handleError } = useErrorHandler();
  //TODO: this return type will change
  const status = useQuery<{ getManagerSeriesWithImage: GetManagerSeriesWithImageOutput[] }>(
    gql`
      query GetManagerSeriesWithImage {
        getManagerSeriesWithImage {
          ID
          backdropImageUrl
          plotSummary
          title
        }
      }
    `
  );

  if (status.error) {
    handleError(status.error);
  }

  return { ...status, isLoading: status.loading, data: status.data?.getManagerSeriesWithImage };
}

export function useUploadVideoOnAwsS3() {
  const progress = useRef<number>(0);
  const { handleError } = useErrorHandler();
  const [isPending, setIsPending] = useState(false);

  const xhr = new XMLHttpRequest();

  const onProgress = (event: ProgressEvent) => {
    if (event.lengthComputable) {
      const percentComplete = (event.loaded / event.total) * 100;
      progress.current = +percentComplete.toFixed(1);
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
      handleError(error);
      throw new Error(error);
    } finally {
      setIsPending(false);
      progress.current = 0;
    }
  };

  return { mutateAsync, isPending, progress: progress.current };
}
