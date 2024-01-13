import { ImageVariantEnum, MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";

import { TableSeriesInterface } from "../types";

export type CreateImageInput = {
  Base64: string;
  Mime: string;
  Variant: ImageVariantEnum;
};

export type GetManagerSeriesForTableInput = {
  Page: number;
  PageSize: number;
};

export type CreateSeriesInput = {
  ImageId: string;
  MediaBasicInfo: CreateMediaBasicInfoInput;
  AdditionalInfo: Partial<CreateAdditionalInfoInput>;
};

export type CreateAdditionalInfoInput = {
  OriginCountry: MediaCountriesEnum;
  OriginalLanguage: MediaLanguagiesEnum;
  Genre: MediaGenriesEnum;
  Status: MediaStatusEnum;
};

export type UpdateImageInput = {
  ImageUrl: string;
  ImageType: ImageVariantEnum;
};

export type CreateMediaBasicInfoInput = {
  Title: string;
  PlotSummary: string;
  ReleaseDate: number;
};

export type DeleteSeriesByIdParams = {
  SeriesId: string;
};

export type UpdateSeriesInput = {
  MediaBasicInfo: Partial<CreateMediaBasicInfoInput>;
  AdditionalInfo: Partial<CreateAdditionalInfoInput>;
  Image: Partial<UpdateImageInput>;
};

export type UpdateSeriesParams = {
  SeriesId: string;
};

export type GetMediaBasicInfoByMediaIdParams = {
  MediaId: string;
};

export type GetAdditionalInfoByMediaIdParams = {
  MediaId: string;
};

export type GetImageByMediaIdParams = {
  MediaId: string;
};

export type GetCineastsBySeriesIdParams = {
  SeriesId: string;
};

export type DeleteMultipleSeriesByIdzParams = {
  SeriesIdz: string[];
};

export type ImageIdOutput = {
  ID: string;
};

export type GetManagerSeriesForTableOutput = {
  seriesList: TableSeriesInterface[];
  totalRecords: number;
};

export type DeleteSeriesByIdOutput = {
  isSuccess: boolean;
};

export type DeleteMultipleSeriesByIdzOutput = {
  isSuccess: true;
};

export type UpdateSeriesOutput = {
  isSuccess: true;
};
