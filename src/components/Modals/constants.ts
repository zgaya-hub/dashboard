import { values as convertEnumToArray } from "lodash";
import { MediaGenriesEnum } from "mirra-scope-client-types/lib";

export const mediaGenreList = convertEnumToArray(MediaGenriesEnum);
