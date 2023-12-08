export const handleOnGetTextColorForBackground = (
  backgroundColor: string
): "black" | "white" => {
  const hexToRgb = (hex: string): number[] => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const calculateLuminance = (r: number, g: number, b: number): number => {
    const sRGB = (value: number) => {
      const v = value / 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };

    const linearR = sRGB(r);
    const linearG = sRGB(g);
    const linearB = sRGB(b);

    return 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
  };

  const [r, g, b] = hexToRgb(backgroundColor);
  const backgroundLuminance = calculateLuminance(r, g, b);
  return backgroundLuminance > 0.5 ? "black" : "white";
};
