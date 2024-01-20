import { GetSharelinkInput, GetImageByMediaIdParams } from "./queryHooks.types";
import { Image } from "zgaya.hub-client-types/lib";
import { gql, useQuery } from "@apollo/client";

export function useGetSharelink(_input: GetSharelinkInput) {
  const status = useQuery(
    gql`
      query GetManagerSeriesWithImageAndBasicInfo {
        getManagerSeriesWithImage {
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
  return { ...status, isLoading: status.loading, data: status.data?.getManagerSeriesWithImage };
}

export function useGetImageByMediaId(params: GetImageByMediaIdParams) {
  const status = useQuery<{ getImageByMediaId: Image }>(
    gql`
      query ($params: GetImageByMediaIdParams!) {
        getImageByMediaId(GetImageByMediaIdParams: $params) {
          ID
          variant
          url
        }
      }
    `,
    {
      variables: { params },
    }
  );
  return { ...status, isLoading: status.loading, data: status.data?.getImageByMediaId };
}
