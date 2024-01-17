import { GenderEnum, MediaCountriesEnum } from "zgaya.hub-client-types/lib";

import { CineastProfessionEnum } from "@/types/enum";

export type CreateCineastInput = {
  ImageId: string;
  FullName: string;
  Profession: CineastProfessionEnum;
  DateOfBirth: number;
  Bio: string;
  Gender: GenderEnum;
  Country: MediaCountriesEnum;
  Award: string[];
};
