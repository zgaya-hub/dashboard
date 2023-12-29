import { PaginationStateInterface } from "@/types/types";

export const DUMMY_PLOT_SUMMARY = "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing ";
export const DUMMY_RELEASE_DATE = new Date().getTime();

export const DEFAULT_PAGINATION_DATE: PaginationStateInterface = {
  Take: 10,
  Skip: 0,
};
