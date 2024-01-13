import { values as convertEnumToArray } from "lodash";
import { MediaGenriesEnum } from "zgaya.hub-client-types/lib";

export const mediaGenreList = convertEnumToArray(MediaGenriesEnum);
