import { NoRecordFoundIllustration } from "@/assets/Illestrations";
import Button from "@/components/Button";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Box, SxProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface CountryPickerEmptyComponentProps {
  message?: string;
  width?: number;
  height?: number;
  sx?: SxProps;
}

export default function CountryPickerEmptyComponent({ message, height, width, sx }: CountryPickerEmptyComponentProps) {
  const { t } = useTranslation();

  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    width: width ? theme.spacing(width) : "100%",
    height: height ? theme.spacing(height) : "100%",
    ...sx,
  }));

  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} sx={containerStyle}>
      <NoRecordFoundIllustration />
      <Typography mb={2}>{message ?? t("Component.Modals.CountryPickerModal.CountryPickerEmptyComponent.message")}</Typography>
      <Button variant="text" size="small">{t("Component.Modals.CountryPickerModal.CountryPickerEmptyComponent.addCountry")}</Button>
    </Box>
  );
}
