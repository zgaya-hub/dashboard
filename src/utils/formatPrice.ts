import { round } from "lodash";

export default function handleOnFormatPrice(value: number | undefined): string {
  if (value === undefined) {
    return "";
  }
  const roundedValue = round(value, 2);
  return roundedValue.toLocaleString();
}
