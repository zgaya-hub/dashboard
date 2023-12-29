import { MediaCountriesEnum, MediaLanguagiesEnum, MediaGenriesEnum, MediaImageTypeEnum, MediaStatusEnum } from "@/types/enum";

export type CreateMediaImageInput = {
  MediaImageBase64: string;
  MediaImageMime: string;
  MediaImageType: MediaImageTypeEnum;
};

export type GetManagerSeriesForTableInput = {
  Take: number;
  Skip: number;
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
  seriesList: GetManagerTableOutputSeriesList[];
  totalRecords: number;
}

export interface GetManagerTableOutputSeriesList {
  ID: string;
  mediaOriginCountry: MediaCountriesEnum;
  mediaOriginalLanguage: MediaLanguagiesEnum;
  mediaGenre: MediaGenriesEnum;
  mediaStatus: MediaStatusEnum;
  mediaTitle: string;
  mediaPlotSummary: string;
  mediaReleaseDate: number;
  mediaImageUrl: string;
  createdAt: number;
  updatedAt: number;
}
