import { MediaCountriesEnum, MediaLanguagiesEnum, MediaGenriesEnum, MediaStatusEnum } from "@/types/enum";

export interface SeriesCreateFieldType {
  mediaTitle: string;
  mediaPlotSummary: string;
  mediaReleaseDate: number;
  mediaImageId: string;
  mediaOriginCountry: MediaCountriesEnum;
  mediaOriginalLanguage: MediaLanguagiesEnum;
  mediaGenre: MediaGenriesEnum;
  mediaStatus: MediaStatusEnum;
}

export interface ManagerTableSeriesList {
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
