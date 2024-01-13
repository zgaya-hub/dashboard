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

export function useGetImageByMediaId(param: GetImageByMediaIdParams) {
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
