import { ImageVariantEnum, MovierMediaEnum } from "@/types/enum";

export type GetUploadVideoSignedUrlInput = {
  MediaType: MovierMediaEnum;
  Width: number;
  Height: number;
  RunTime: number;
  SizeInKb: number;
  Mime: string;
};

export type UploadVideoOnAwsS3Input = {
  VideoBlob: Blob;
  SignedUrl: string;
};

export type GetSeasonBySeriesIdInput = {
  SeriesId: string;
};

export type CreateEpisodeInput = {
  Number: number;
  SeasonId: string;
  VideoId: string;
  SignedUrlKeyId: string;
  ImageId: string;
  MediaBasicInfo: BasicInfoInput;
};

export type BasicInfoInput = {
  Title: string;
  PlotSummary: string;
  ReleaseDate: number;
};

export type CreateImageInput = {
  Base64: string;
  Mime: string;
  Variant: ImageVariantEnum;
};

export type GetSharelinkInput = {
  MediaId: string;
  MediaType: MovierMediaEnum;
};

export type GetImageByMediaIdParams = {
  MediaId: string;
};

export type GetUploadVideoSignedUrlOutput = {
  signedUrl: string;
  signedUrlKeyId: string;
  videoId: string;
};

export type GetManagerSeriesWithImageAndBasicInfoOutput = SeriesEntityType & {
  image: ImageEntityType;
  mediaBasicInfo: MediaBasicInfoEntityType;
};

export type GetSeasonBySeriesIdOutput = SeasonEntityType & {
  mediaBasicInfo: MediaBasicInfoEntityType;
};

export type ImageIdOutput = {
  ID: string;
};

export type GetNextEpisodeNumberParams = {
  SeasonId: string;
};

export type GetNextEpisodeNumberOutput = {
  number: number;
};
