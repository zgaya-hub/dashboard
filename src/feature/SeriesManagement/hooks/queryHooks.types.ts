import { MediaCountriesEnum, MediaLanguagiesEnum, MediaGenriesEnum, MediaImageTypeEnum, MediaStatusEnum } from "@/types/enum";
import { TableSeriesInterface } from "../types";

export type CreateMediaImageInput = {
  MediaImageBase64: string;
  MediaImageMime: string;
  MediaImageType: MediaImageTypeEnum;
};

export type GetManagerSeriesForTableInput = {
  Page: number;
  PageSize: number;
};

export type CreateSeriesInput = {
  MediaImageId: string;
  MediaBasicInfo: MediaBasicInformationInput;
  MediaAdditionalInfo: Partial<MediaAdditionalInformationInput>;
};

export type MediaAdditionalInformationInput = {
  MediaOriginCountry: MediaCountriesEnum;
  MediaOriginalLanguage: MediaLanguagiesEnum;
  MediaGenre: MediaGenriesEnum;
  MediaStatus: MediaStatusEnum;
};

export type UpdateMediaImageInput = {
  MediaImageUrl: string;
  MediaImageType: MediaImageTypeEnum;
};

export type MediaBasicInformationInput = {
  MediaTitle: string;
  MediaPlotSummary: string;
  MediaReleaseDate: number;
};

export type DeleteSeriesByIdParams = {
  SeriesId: string;
};

export type UpdateSeriesInput = {
  MediaBasicInfo: Partial<MediaBasicInformationInput>;
  MediaAdditionalInfo: Partial<MediaAdditionalInformationInput>;
  MediaImage: Partial<UpdateMediaImageInput>;
};

export type UpdateSeriesParams = {
  SeriesId: string;
};

export type GetMediaBasicInfoByMediaIdParams = {
  MediaId: string;
};

export type DeleteMultipleSeriesByIdzParams = {
  SeriesIdz: string[];
};

export type CreateMediaImageOutput = {
  mediaImageId: string;
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

export type GetMediaBasicInfoByMediaIdOutput = {
  title: string;
  plotSummary: string;
  releaseDate: number;
};
