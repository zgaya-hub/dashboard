import { randCountry, randText, randUuid, randLanguage, randMusicGenre, randStatus, randMovie, randPastDate, randUrl } from "@ngneat/falso";

export const getGridData = (page: number, pageSize: number) => {
  const getGridData = [];
  for (let i = 1; i <= 30; i++) {
    getGridData.push({
      ID: randUuid(),
      originCountry: randCountry(),
      originalLanguage: randLanguage(),
      genre: randMusicGenre(),
      status: randStatus(),
      title: randMovie(),
      plotSummary: randText({ length: 10 }),
      releaseDate: randPastDate().getTime(),
      mediaImageUrl: randUrl(),
      createdAt: randPastDate().getTime(),
      updatedAt: randPastDate().getTime(),
    });
  }

  return getGridData.splice(page, pageSize);
};
