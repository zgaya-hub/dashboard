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
