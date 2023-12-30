import { MediaCountriesEnum, MediaLanguagiesEnum, MediaGenriesEnum, MediaImageTypeEnum, MediaStatusEnum } from "@/types/enum";
import { ManagerTableSeriesList } from "../types";

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
  MediaAdditionalInfo: MediaAdditionalInformationInput;
};

export type MediaAdditionalInformationInput = {
  MediaOriginCountry?: MediaCountriesEnum;
  MediaOriginalLanguage?: MediaLanguagiesEnum;
  MediaGenre?: MediaGenriesEnum;
  MediaStatus?: MediaStatusEnum;
};

export type MediaBasicInformationInput = {
  MediaTitle: string;
  MediaPlotSummary: string;
  MediaReleaseDate: number;
};

export type CreateMediaImageOutput = {
  mediaImageId: string;
};

export interface GetManagerSeriesForTableOutput {
  seriesList: ManagerTableSeriesList[];
  totalRecords: number;
}

export interface DeleteSeriesByIdInput {
  SeriesId: string;
}

export interface DeleteMultipleSeriesByIdzInput {
  SeriesIdz: string[];
}

export interface DeleteSeriesByIdOutput {
}

export interface DeleteMultipleSeriesByIdzOutput {
  isSuccess: true;
}
