export default function handleOnParsePrice(inputValue: string): number {
  const numericValue = parseFloat(inputValue.replace(/,/g, ""));
  return isNaN(numericValue) ? 0 : numericValue;
}
