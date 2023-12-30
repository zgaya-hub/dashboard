import { randCountry, randText, randUuid, randLanguage, randMusicGenre, randStatus, randMovie, randPastDate, randUrl } from "@ngneat/falso";

export const getGridData = (page: number, pageSize: number) => {
  const getGridData = [];
  for (let i = 1; i <= 30; i++) {
    getGridData.push({
      ID: randUuid(),
      mediaOriginCountry: randCountry(),
      mediaOriginalLanguage: randLanguage(),
      mediaGenre: randMusicGenre(),
      mediaStatus: randStatus(),
      mediaTitle: randMovie(),
      mediaPlotSummary: randText({ length: 10 }),
      mediaReleaseDate: randPastDate().getTime(),
      mediaImageUrl: randUrl(),
      createdAt: randPastDate().getTime(),
      updatedAt: randPastDate().getTime(),
    });
  }

  return getGridData.splice(page, pageSize);
};
