type SeriesEntityType = {
  seriesIsFree: number;
  seriesPriceInDollar: number;
} & EntityBaseType;

type MediaImageEntityType = {
  mediaImageType: string;
  mediaImageUrl: string;
} & EntityBaseType;

type MediaBasicInfoEntityType = {
  plotSummary: string;
  releaseDate: number;
  title: string;
} & EntityBaseType;

type SeasonEntityType = {
  seasonNumber: number;
} & EntityBaseType;
