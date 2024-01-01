import { CountriesEnum, LanguagiesEnum, MediaGenriesEnum, MediaImageVariantEnum, MediaStatusEnum } from "@/types/enum";
import { TableSeriesInterface } from "../types";

export type CreateMediaImageInput = {
  Base64: string;
  Mime: string;
  Variant: MediaImageVariantEnum;
};

export type GetManagerSeriesForTableInput = {
  Page: number;
  PageSize: number;
};

export type CreateSeriesInput = {
  MediaImageId: string;
  MediaBasicInfo: CreateMediaBasicInfoInput;
  MediaAdditionalInfo: Partial<CreateMediaAdditionalInfoInput>;
};

export type CreateMediaAdditionalInfoInput = {
  OriginCountry: CountriesEnum;
  OriginalLanguage: LanguagiesEnum;
  Genre: MediaGenriesEnum;
  Status: MediaStatusEnum;
};

export type UpdateImageInput = {
  ImageUrl: string;
  ImageType: MediaImageVariantEnum;
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
  MediaAdditionalInfo: Partial<CreateMediaAdditionalInfoInput>;
  Image: Partial<UpdateImageInput>;
};

export type UpdateSeriesParams = {
  SeriesId: string;
};

export type GetMediaBasicInfoByMediaIdParams = {
  MediaId: string;
};

export type GetMediaAdditionalInfoByMediaIdParams = {
  MediaId: string;
};

export type GetMediaImageByMediaIdParams = {
  MediaId: string;
};

export type DeleteMultipleSeriesByIdzParams = {
  SeriesIdz: string[];
};

export type MediaImageIdOutput = {
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
