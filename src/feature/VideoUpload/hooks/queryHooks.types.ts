import { MovierMediaEnum } from "@/types/enum";
import { MediaImageTypeEnum } from "../enum";

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
  EpisodeNo: number;
  SeasonId: string;
  VideoId: string;
  SignedUrlKeyId: string;
  MediaImageId: string;
  MediaBasicInfo: MediaBasicInfoInput;
};

export type MediaBasicInfoInput = {
  Title: string;
  PlotSummary: string;
  ReleaseDate: number;
};

export type CreateMediaImageInput = {
  MediaImageBase64: string;
  MediaImageMime: string;
  MediaImageType: MediaImageTypeEnum;
};

export type GetUploadVideoSignedUrlOutput = {
  SignedUrl: string;
  SignedUrlKeyId: string;
  VideoId: string;
};

export type GetManagerSeriesWithImageAndBasicInfoOutput = SeriesEntityType & {
  mediaImage: MediaImageEntityType[];
  mediaBasicInfo: MediaBasicInfoEntityType;
};

export type GetSeasonBySeriesIdOutput = SeasonEntityType & {
  mediaBasicInfo: MediaBasicInfoEntityType;
};

export type CreateMediaImageOutput = {
  mediaImageId: string;
};
