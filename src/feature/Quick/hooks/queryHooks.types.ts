import { CountriesEnum, LanguagiesEnum, MediaGenriesEnum, MediaImageVariantEnum, MediaStatusEnum } from "@/types/enum";

export type CreateMediaImageInput = {
  Base64: string;
  Mime: string;
  Variant: MediaImageVariantEnum;
};

export type CreateSeriesInput = {
  MediaImageId: string;
  MediaBasicInfo: CreateMediaBasicInfoInput;
  MediaAdditionalInfo: MediaAdditionalInfoInput;
};

export type CreateSeasonInput = {
  MediaBasicInfo: CreateMediaBasicInfoInput;
  MediaImageId: string;
  Number: number;
  SeriesId: string;
};

export type MediaAdditionalInfoInput = {
  OriginCountry?: CountriesEnum;
  OriginalLanguage?: LanguagiesEnum;
  Genre?: MediaGenriesEnum;
  Status?: MediaStatusEnum;
};

export type CreateMediaBasicInfoInput = {
  Title: string;
  PlotSummary: string;
  ReleaseDate: number;
};

export type GetNextSeasonNumberParams = {
  SeriesId: string;
};

export type MediaImageIdOutput = {
  ID: string;
};

export type GetNextSeasonNumberOutput = {
  number: number;
};
