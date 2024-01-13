import { GenderEnum, ImageVariantEnum, MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";

import { CineastProfessionEnum } from "@/types/enum";

export type CreateImageInput = {
  Base64: string;
  Mime: string;
  Variant: ImageVariantEnum;
};

export type CreateSeriesInput = {
  ImageId: string;
  MediaBasicInfo: CreateMediaBasicInfoInput;
  AdditionalInfo: AdditionalInfoInput;
};

export type CreateSeasonInput = {
  MediaBasicInfo: CreateMediaBasicInfoInput;
  ImageId: string;
  Number: number;
  SeriesId: string;
};

export type CreateCineastInput = {
  ImageId: string;
  FullName: string;
  Profession: CineastProfessionEnum;
  DateOfBirth: number;
  Bio: string;
  Gender: GenderEnum;
  Country: MediaCountriesEnum;
  Award: string[];
};

export type AdditionalInfoInput = {
  OriginCountry?: MediaCountriesEnum;
  OriginalLanguage?: MediaLanguagiesEnum;
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

export type ImageIdOutput = {
  ID: string;
};

export type GetNextSeasonNumberOutput = {
  number: number;
};
