import { MediaCountriesEnum, MediaLanguagiesEnum, MediaGenriesEnum, MediaImageTypeEnum, MediaStatusEnum } from "@/types/enum";

export type CreateMediaImageInput = {
  MediaImageBase64: string;
  MediaImageMime: string;
  MediaImageType: MediaImageTypeEnum;
};

export type CreateSeriesInput = {
  MediaImageId: string;
  MediaBasicInfo: MediaBasicInformationInput;
  MediaAdditionalInfo: MediaAdditionalInformationInput;
};

export type MediaAdditionalInformationInput = {
  OriginCountry?: MediaCountriesEnum;
  OriginalLanguage?: MediaLanguagiesEnum;
  Genre?: MediaGenriesEnum;
  Status?: MediaStatusEnum;
};

export type MediaBasicInformationInput = {
  Title: string;
  PlotSummary: string;
  ReleaseDate: number;
};

export type CreateMediaImageOutput = {
  mediaImageId: string;
};
