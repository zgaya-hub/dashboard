import { MediaGenriesEnum } from "@/types/enum";
import { values as convertEnumToArray } from "lodash";

export const mediaGenreList = convertEnumToArray(MediaGenriesEnum);
