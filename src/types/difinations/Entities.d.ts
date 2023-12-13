type SeriesEntityType = {
  seriesIsFree: number;
  seriesPriceInDollar: number;
} & EntityBaseType;

type MediaImageEntityType = {
  mediaImageType: string;
  mediaImageUrl: string;
} & EntityBaseType;

type MediaBasicInfoEntityType = {
  mediaPlotSummary: string
  mediaReleaseDate: number
  mediaTitle: string
} & EntityBaseType;