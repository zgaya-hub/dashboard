import { NoRecordFoundIllustration } from "@/assets/Illestrations";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DataGridEmptyComponentProps {
  message: string;
}

export default function DataGridEmptyComponent({message} : DataGridEmptyComponentProps) {
  const {t}= useTranslation()
  return (
    <Box display={'flex'} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"}>
      <NoRecordFoundIllustration />
      <Typography>{message ?? t("Component.DataGridPro.DataGridEmptyComponent.message")}</Typography>
    </Box>
  );
}
