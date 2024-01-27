import { ChangeImageInput, DeleteMovieByIdParams, DeleteMultipleMovieByIdzParams, GetManagerMovieForTableInput, GetManagerMovieForTableOutput, GetMovieDataForUpdateFormOutput, GetUploadVideoSignedUrlInput, ImageMediaIdParams, MovieIdParams, SuccessOutput, UpdateMovieInput, UploadVideoSignedUrlOutput, ChangeMovieInput, GetMovieDetailsByIdOutput } from "zgaya.hub-client-types/lib";
import { useErrorHandler } from ".";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { UploadVideoOnAwsS3Input } from "@/feature/Upload/hooks";

export function useDeleteMultipleMovieByIdz() {
  const seriesError = useErrorHandler();
  const [apiCaller, status] = useMutation<{ deleteMultipleMovieByIdz: SuccessOutput }, { params: DeleteMultipleMovieByIdzParams }>(
    gql`
      mutation ($params: DeleteMultipleMovieByIdzParams!) {
        deleteMultipleMovieByIdz(DeleteMultipleMovieByIdzParams: $params) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (params: DeleteMultipleMovieByIdzParams) => {
    try {
      const result = await apiCaller({ variables: { params } });
      return result.data?.deleteMultipleMovieByIdz;
    } catch (error) {
      seriesError.handleError(error);
      throw new Error(error);
    }
  };

  return { mutateAsync, data: status.data?.deleteMultipleMovieByIdz, isPending: status.loading, ...status };
}

export function useUpdateMovie() {
  const seriesError = useErrorHandler();

  const [apiCaller, status] = useMutation<{ updateMovie: SuccessOutput }, { params: MovieIdParams; input: UpdateMovieInput }>(
    gql`
      mutation ($params: MovieIdParams!, $input: UpdateMovieInput!) {
        updateMovie(MovieIdParams: $params, UpdateMovieInput: $input) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (params: MovieIdParams, input: UpdateMovieInput) => {
    try {
      const result = await apiCaller({ variables: { input, params } });
      return result.data?.updateMovie;
    } catch (error) {
      seriesError.handleError(error);
      throw new Error(error);
    }
  };

  return { mutateAsync, data: status.data?.updateMovie, isPending: status.loading, ...status };
}

export function useGetManagerMovieForTable(input: GetManagerMovieForTableInput) {
  const seriesError = useErrorHandler();
  const status = useQuery<{ getManagerMovieForTable: GetManagerMovieForTableOutput }, { input: GetManagerMovieForTableInput }>(
    gql`
      query ($input: GetManagerMovieForTableInput!) {
        getManagerMovieForTable(GetManagerMovieForTableInput: $input) {
          totalRecords
          movieList {
            ID
            status
            title
            plotSummary
            releaseDate
            thumbnailUrl
            likeCount
            avarageRating
            uploadDate
          }
        }
      }
    `,
    {
      variables: { input },
    }
  );

  if (status.error) {
    seriesError.handleError(status.error);
  }

  return { ...status, isLoading: status.loading, data: status.data?.getManagerMovieForTable };
}

export function useDeleteMovieById() {
  const seriesError = useErrorHandler();
  const [apiCaller, status] = useMutation<{ deleteMovieById: SuccessOutput }, { params: DeleteMovieByIdParams }>(gql`
    mutation ($params: DeleteMovieByIdParams!) {
      deleteMovieById(DeleteMovieByIdParams: $params) {
        isSuccess
      }
    }
  `);

  const mutateAsync = async (params: DeleteMovieByIdParams) => {
    try {
      const result = await apiCaller({ variables: { params } });
      return result.data?.deleteMovieById;
    } catch (error) {
      seriesError.handleError(error);
      throw new Error(error);
    }
  };

  status;

  return { mutateAsync, data: status.data?.deleteMovieById, isPending: status.loading, ...status };
}

export function useGetMovieDataForUpdateForm(params: MovieIdParams) {
  const { handleError } = useErrorHandler();

  const status = useQuery<{ getMovieDataForUpdateForm: GetMovieDataForUpdateFormOutput }>(
    gql`
      query ($params: MovieIdParams!) {
        getMovieDataForUpdateForm(MovieIdParams: $params) {
          title
          plotSummary
          releaseDate
          genre
          status
          originCountry
          originalLanguage
          thumbnailUrl
          videoResourceId
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

  return { ...status, isLoading: status.loading, data: status.data?.getMovieDataForUpdateForm };
}

export function useChangeImageByMediaId() {
  const { handleError } = useErrorHandler();

  const [apiCaller, status] = useMutation<{ changeImageByMediaId: SuccessOutput }, { params: ImageMediaIdParams; input: ChangeImageInput }>(
    gql`
      mutation ($params: ImageMediaIdParams!, $input: ChangeImageInput!) {
        changeImageByMediaId(ImageMediaIdParams: $params, ChangeImageInput: $input) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (params: ImageMediaIdParams, input: ChangeImageInput) => {
    try {
      const result = await apiCaller({ variables: { params, input } });
      return result.data?.changeImageByMediaId;
    } catch (error) {
      handleError(error);
    }
  };

  return { mutateAsync, data: status.data?.changeImageByMediaId, isPending: status.loading, ...status };
}

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

export function useChangeMovie() {
  const { handleError } = useErrorHandler();
  const [apiCaller, status] = useMutation<{ changeMovie: SuccessOutput }, { params: MovieIdParams; input: ChangeMovieInput }>(
    gql`
      mutation ($params: MovieIdParams!, $input: ChangeMovieInput!) {
        changeMovie(MovieIdParams: $params, ChangeMovieInput: $input) {
          isSuccess
        }
      }
    `
  );
  const mutateAsync = async (params: MovieIdParams, input: ChangeMovieInput) => {
    try {
      const result = await apiCaller({ variables: { params, input } });
      return result.data?.changeMovie;
    } catch (error) {
      handleError(error);
      throw new Error(error);
    }
  };

  return { ...status, mutateAsync, data: status.data?.changeMovie, isPending: status.loading };
}

export function useUploadVideoOnAwsS3() {
  const [progress, setProgress] = useState<number>(0);
  const { handleError } = useErrorHandler();
  const [isPending, setIsPending] = useState(false);

  const xhr = new XMLHttpRequest();

  const onProgress = (event: ProgressEvent) => {
    if (event.lengthComputable) {
      const percentComplete = (event.loaded / event.total) * 100;
      // Update progress when the percentage is approximately a multiple of 10
      if (Math.abs((percentComplete % 18) - 1) <= 2 || percentComplete === 100) {
        setProgress(percentComplete);
      }
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
    }
  };

  return { mutateAsync, isPending, progress };
}

export function useGetMovieDetailsById(params: MovieIdParams) {
  const status = useQuery<{ getMovieDetailsById: GetMovieDetailsByIdOutput }>(
    gql`
      query ($params: MovieIdParams!) {
        getMovieDetailsById(MovieIdParams: $params) {
          ID
          originCountry
          originalLanguage
          genre
          status
          title
          plotSummary
          releaseDate
          thumbnailUrl
          uploadDate
          isFree
        }
      }
    `,
    {
      variables: { params },
    }
  );
  return { ...status, isLoading: status.loading, data: status.data?.getMovieDetailsById };
}
