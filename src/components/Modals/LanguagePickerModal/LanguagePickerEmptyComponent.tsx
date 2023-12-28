import { NoRecordFoundIllustration } from "@/assets/Illestrations";
import Button from "@/components/Button";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Box, SxProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface LanguagePickerEmptyComponentProps {
  message?: string;
  width?: number;
  height?: number;
  sx?: SxProps;
}

export default function LanguagePickerEmptyComponent({ message, height, width, sx }: LanguagePickerEmptyComponentProps) {
  const { t } = useTranslation();

  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    width: width ? theme.spacing(width) : "100%",
    height: height ? theme.spacing(height) : "100%",
    ...sx,
  }));

  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} sx={containerStyle}>
      <NoRecordFoundIllustration />
      <Typography mb={2}>{message ?? t("Components.Modals.LanguagePickerModal.LanguagePickerEmptyComponent.message")}</Typography>
      <Button variant="text" size="small">{t("Components.Modals.LanguagePickerModal.LanguagePickerEmptyComponent.addLanguage")}</Button>
    </Box>
  );
}
