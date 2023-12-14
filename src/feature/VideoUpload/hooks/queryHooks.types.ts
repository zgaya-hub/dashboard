import { MovierMediaEnum } from "@/types/enum";

export type GetUploadVideoSignedUrlInput = {
  MediaType: MovierMediaEnum;
  Width: number;
  Height: number;
  RunTime: number;
  SizeInKb: number;
  Mime: string;
};

export type GetUploadVideoSignedUrlOutput = {
  SignedUrl: string;
  SignedUrlKeyId: string;
  VideoId: string;
};

export type UploadVideoOnAwsS3Input = {
  VideoBlob: Blob;
  SignedUrl: string;
};

export type GetManagerSeriesWithImageAndBasicInfo = SeriesEntityType & {
  mediaImage: MediaImageEntityType[];
  mediaBasicInfo: MediaBasicInfoEntityType;
};

export type GetSeasonBySeriesIdInput = {
  SeriesId: string;
};

export type GetSeasonBySeriesIdOutput = SeasonEntityType & {
  mediaBasicInfo: MediaBasicInfoEntityType;
};
