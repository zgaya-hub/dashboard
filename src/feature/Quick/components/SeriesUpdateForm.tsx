import { DatePickerModal, FileSelectInput, ModalSelectInput, PriceField, SelectInput, TextField } from "@/components/Form";
import { DevTool } from "@hookform/devtools";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SeriesUpdateFormFieldInterface } from "../types";
import { CountryPickerModal, GenrePickerModal, LanguagePickerModal } from "@/components/Modals";
import { useState } from "react";
import { MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";
import { values } from "lodash";
import { Backdrop, CircularProgress, MenuItem, Typography } from "@mui/material";
import { useGetSeriesDetailsById } from "../hooks";

export interface SeriesUpdateFormProps {
  seriesId: string;
}

export default function SeriesUpdateForm({ seriesId }: SeriesUpdateFormProps) {
  const { t } = useTranslation();
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [isGenreModalVisible, setIsGenreModalVisible] = useState(false);
  const { data: seriesDetailsData, refetch, isLoading: isSeriesDetailsLoading, error } = useGetSeriesDetailsById({ SeriesId: seriesId });

  const {
    control: formControl,
    register: formRegister,
    formState: { errors: formErrors },
    handleSubmit: submitForm,
    setValue: setFormValue,
    watch: watchFormValue,
  } = useForm<SeriesUpdateFormFieldInterface>({
    defaultValues: {
      budget: seriesDetailsData?.budget,
      netProfit: seriesDetailsData?.netProfit,
      revenue: seriesDetailsData?.revenue,
    },
  });

  const handleOnSelectCountry = (countrName: MediaCountriesEnum) => {
    setFormValue("originCountry", countrName);
    handleOnToggleCountryModal();
  };

  const handleOnSelectGenre = (genre: MediaGenriesEnum) => {
    setFormValue("genre", genre);
    handleOnToggleGenreModal();
  };

  const handleOnSelectLanguage = (language: MediaLanguagiesEnum) => {
    setFormValue("originalLanguage", language);
    handleOnToggleLanguageModal();
  };

  const handleOnToggleCountryModal = () => {
    setIsCountryModalVisible(!isCountryModalVisible);
  };

  const handleOnToggleGenreModal = () => {
    setIsGenreModalVisible(!isGenreModalVisible);
  };

  const handleOnToggleLanguageModal = () => {
    setIsLanguageModalVisible(!isLanguageModalVisible);
  };

  return (
    <Stack padding={4} gap={2}>
      <Backdrop open={isSeriesDetailsLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <TextField register={formRegister} name="title" label={t("Feature.Quick.SeriesUpdateForm.title")} helperText={formErrors.title?.message} error={!!formErrors.title} fullWidth autoFocus />
      <DatePickerModal label={t("Feature.Quick.SeriesUpdateForm.releaseDate")} views={["year", "month"]} fullWidth register={formRegister} name={"releaseDate"} />
      <FileSelectInput
        label={t("Feature.Quick.SeriesUpdateForm.selectBackdropImage")}
        fullWidth
        onFileSelect={(e: File) => {
          console.log("");
        }}
        loading={false}
        helperText={formErrors.imageId?.message}
        error={!!formErrors.imageId}
      />
      <TextField register={formRegister} name="plotSummary" label={t("Feature.Quick.SeriesUpdateForm.plotSummary")} helperText={formErrors.plotSummary?.message} error={!!formErrors.plotSummary} multiline rows={5} fullWidth />
      <Stack gap={2} py={1}>
        <Typography variant="h5">Financial info</Typography>
        <ModalSelectInput isModalVisible={isCountryModalVisible} label={t("Feature.Quick.SeriesUpdateForm.originCountry")} value={watchFormValue("originCountry")} onClick={handleOnToggleCountryModal} fullWidth />
        <CountryPickerModal isOpen={isCountryModalVisible} onClose={handleOnToggleCountryModal} onOk={handleOnSelectCountry} />
        <ModalSelectInput isModalVisible={isLanguageModalVisible} label={t("Feature.Quick.SeriesUpdateForm.originalLanguage")} value={watchFormValue("originalLanguage")} onClick={handleOnToggleLanguageModal} fullWidth />
        <LanguagePickerModal isOpen={isLanguageModalVisible} onClose={handleOnToggleLanguageModal} onOk={handleOnSelectLanguage} />
        <ModalSelectInput isModalVisible={isGenreModalVisible} label={t("Feature.Quick.SeriesUpdateForm.pickAGenre")} value={watchFormValue("genre")} onClick={handleOnToggleGenreModal} fullWidth />
        <GenrePickerModal isOpen={isGenreModalVisible} onClose={handleOnToggleGenreModal} onOk={handleOnSelectGenre} />
        <SelectInput label={t("Feature.Quick.SeriesUpdateForm.selectStatus")} fullWidth name="status" register={formRegister}>
          {seriesStatusesList.map((movieStatus) => {
            return <MenuItem value={movieStatus}>{movieStatus}</MenuItem>;
          })}
        </SelectInput>
      </Stack>
      <Stack gap={2} py={1}>
        <Typography variant="h5">Financial info</Typography>
        <PriceField label={t("Feature.Quick.SeriesUpdateForm.netProfit")} control={formControl} name="netProfit" />
        <PriceField label={t("Feature.Quick.SeriesUpdateForm.revenue")} control={formControl} name="revenue" />
        <PriceField label={t("Feature.Quick.SeriesUpdateForm.budget")} control={formControl} name="budget" />
      </Stack>
      <DevTool control={formControl} />
    </Stack>
  );
}

const seriesStatusesList = values(MediaStatusEnum);
