import { CountriesEnum, LanguagiesEnum, GenriesEnum, MediaImageVariantEnum, StatusEnum } from "@/types/enum";

export type CreateMediaImageInput = {
  Base64: string;
  Mime: string;
  Variant: MediaImageVariantEnum;
};

export type CreateSeriesInput = {
  MediaImageId: string;
  MediaBasicInfo: CreateMediaBasicInfoInput;
  MediaAdditionalInfo: MediaAdditionalInformationInput;
};

export type CreateSeasonInput = {
  MediaBasicInfo: CreateMediaBasicInfoInput;
  MediaImageId: string;
  Number: number;
  SeriesId: string;
};

export type MediaAdditionalInformationInput = {
  OriginCountry?: CountriesEnum;
  OriginalLanguage?: LanguagiesEnum;
  Genre?: GenriesEnum;
  Status?: StatusEnum;
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
