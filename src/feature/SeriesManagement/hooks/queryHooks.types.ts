import { MediaImageTypeEnum } from "@/types/enum";

export type CreateMediaImageInput = {
  MediaImageBase64: string;
  MediaImageMime: string;
  MediaImageType: MediaImageTypeEnum;
};

export type CreateSeriesInput = {
  MediaImageId: string;
  MediaBasicInfo: MediaBasicInfoInput;
};

export type MediaBasicInfoInput = {
  Title: string;
  PlotSummary: string;
  ReleaseDate: number;
};

export type CreateMediaImageOutput = {
  mediaImageId: string;
};
