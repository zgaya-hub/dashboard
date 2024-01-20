import { DatePickerModal, FileSelectInput, Form, ModalSelectInput, PriceField, SelectInput, TextField } from "@/components/Form";
import { DevTool } from "@hookform/devtools";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SeriesUpdateFormFieldInterface } from "../types";
import { ConfirmationModal, CountryPickerModal, GenrePickerModal, LanguagePickerModal } from "@/components/Modals";
import { Ref, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";
import { values } from "lodash";
import { Backdrop, CardMedia, CircularProgress, DialogContentText, MenuItem, SxProps, Typography } from "@mui/material";
import { useChangeImageByMediaId, useGetSeriesDetailsById, useUpdateSeries } from "../hooks";
import { extractImageBase64, extractImageMetadata, extractImageUrl } from "metalyzer";

export interface SeriesUpdateFormProps {
  seriesId: string;
}

export interface SeriesTableRefInterface {
  onSave: () => void;
}

const SeriesUpdateForm = forwardRef(function SeriesUpdateForm({ seriesId }: SeriesUpdateFormProps, ref: Ref<SeriesTableRefInterface>) {
  const { t } = useTranslation();
  const [backdropImageUrl, setBackdropImageUrl] = useState("");
  const [isGenreModalVisible, setIsGenreModalVisible] = useState(false);
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [isImageChangeConfirmationModalVisible, setisImageChangeConfirmationModalVisible] = useState(false);

  const { data: seriesDetailsData, isLoading: isSeriesDetailsLoading } = useGetSeriesDetailsById({ SeriesId: seriesId });
  const { mutateAsync: updateSeriesMutateAsync, isPending: isUpdateSeriesLoading } = useUpdateSeries();
  const { mutateAsync: changeImageMutateAsync, isPending: isChangeImageLoading } = useChangeImageByMediaId();

  useImperativeHandle(ref, () => ({
    onSave: formSubmit(handleOnUpdateSeries),
  }));

  const {
    control: formControl,
    register: formRegister,
    setValue: setFormValue,
    watch: watchFormValue,
    handleSubmit: formSubmit,
  } = useForm<SeriesUpdateFormFieldInterface>({
    defaultValues: {
      budget: seriesDetailsData?.budget,
      netProfit: seriesDetailsData?.netProfit,
      revenue: seriesDetailsData?.revenue,
    },
  });

  useEffect(() => {
    if (seriesDetailsData) {
      setFormValue("title", seriesDetailsData?.title);
      setFormValue("plotSummary", seriesDetailsData?.plotSummary);
      setFormValue("releaseDate", seriesDetailsData?.releaseDate);
      setFormValue("originCountry", seriesDetailsData?.originCountry);
      setFormValue("originalLanguage", seriesDetailsData?.originalLanguage);
      setFormValue("genre", seriesDetailsData?.genre);
      setFormValue("status", seriesDetailsData?.status);
      setFormValue("netProfit", seriesDetailsData?.netProfit);
      setFormValue("revenue", seriesDetailsData?.revenue);
      setFormValue("budget", seriesDetailsData?.budget);
      setBackdropImageUrl(seriesDetailsData?.imageUrl);
    }
  }, [seriesDetailsData]);

  const handleOnImageUploadConfirm = async () => {
    const { mimeType } = await extractImageMetadata(watchFormValue("image"));
    const imageBase64 = await extractImageBase64(watchFormValue("image"));
    setBackdropImageUrl(await extractImageUrl(watchFormValue("image")));
    await changeImageMutateAsync({ MediaId: seriesId }, { Base64: imageBase64, Mime: mimeType });
  };

  const handleOnUpdateSeries = async (input: SeriesUpdateFormFieldInterface) => {
    await updateSeriesMutateAsync(
      { SeriesId: seriesId },
      {
        AdditionalInfo: {
          Genre: input.genre,
          Status: input.status,
          OriginalLanguage: input.originalLanguage,
          OriginCountry: input.originCountry,
        },
        ReleaseDate: +input.releaseDate,
        PlotSummary: input.plotSummary,
        Title: input.title,
        FinancialInfo: {
          Budget: input.budget,
          NetProfit: input.netProfit,
          Revenue: input.revenue,
        },
      }
    );
  };

  const handleOnImageSelect = (image: File) => {
    setFormValue("image", image);
    handleOnToggleImageChangeConfimationModal();
  };

  const handleOnToggleImageChangeConfimationModal = () => {
    setisImageChangeConfirmationModalVisible(!isImageChangeConfirmationModalVisible);
  };

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

  const fileSelectInputContainerStyle: SxProps = {
    "& .appear-item": {
      display: "none",
    },
    "&:hover .appear-item": {
      display: "block",
    },
  };

  return (
    <Form padding={4} gap={2} onSubmit={formSubmit(handleOnUpdateSeries)}>
      <Backdrop open={isSeriesDetailsLoading || isUpdateSeriesLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <TextField
        // TODO: label not shrink when value set with setState on init
        register={formRegister}
        name="title"
        label={t("Feature.Quick.SeriesUpdateForm.title")}
        fullWidth
        autoFocus
      />
      <DatePickerModal
        // TODO: values not set when set with setState
        label={t("Feature.Quick.SeriesUpdateForm.releaseDate")}
        views={["year", "month"]}
        fullWidth
        register={formRegister}
        name={"releaseDate"}
      />

      <Stack sx={fileSelectInputContainerStyle}>
        <FileSelectInput loading={isChangeImageLoading} label={t("Feature.Quick.SeriesUpdateForm.selectBackdropImage")} fullWidth onFileSelect={handleOnImageSelect} />
        <CardMedia component="img" className="appear-item" image={backdropImageUrl} />
      </Stack>

      <TextField
        // TODO: label not shrink when value set with setState on init
        register={formRegister}
        name="plotSummary"
        label={t("Feature.Quick.SeriesUpdateForm.plotSummary")}
        multiline
        rows={5}
        fullWidth
      />
      <Stack gap={2} py={1}>
        <Typography variant="h5">{t("Feature.Quick.SeriesUpdateForm.additionalInfo")}</Typography>

        <ModalSelectInput isModalVisible={isCountryModalVisible} label={t("Feature.Quick.SeriesUpdateForm.originCountry")} value={watchFormValue("originCountry")} onClick={handleOnToggleCountryModal} fullWidth />
        <CountryPickerModal isOpen={isCountryModalVisible} onClose={handleOnToggleCountryModal} onOk={handleOnSelectCountry} />
        <ModalSelectInput isModalVisible={isLanguageModalVisible} label={t("Feature.Quick.SeriesUpdateForm.originalLanguage")} value={watchFormValue("originalLanguage")} onClick={handleOnToggleLanguageModal} fullWidth />
        <LanguagePickerModal isOpen={isLanguageModalVisible} onClose={handleOnToggleLanguageModal} onOk={handleOnSelectLanguage} />
        <ModalSelectInput isModalVisible={isGenreModalVisible} label={t("Feature.Quick.SeriesUpdateForm.pickAGenre")} value={watchFormValue("genre")} onClick={handleOnToggleGenreModal} fullWidth />
        <GenrePickerModal isOpen={isGenreModalVisible} onClose={handleOnToggleGenreModal} onOk={handleOnSelectGenre} />

        <SelectInput
          // TODO: values not set when set with setState
          label={t("Feature.Quick.SeriesUpdateForm.selectStatus")}
          fullWidth
          name="status"
          register={formRegister}
        >
          {seriesStatusesList.map((movieStatus) => {
            return <MenuItem value={movieStatus}>{movieStatus}</MenuItem>;
          })}
        </SelectInput>
      </Stack>

      <Stack gap={2}>
        <Typography variant="h5">{t("Feature.Quick.SeriesUpdateForm.financialInfo")}</Typography>
        <PriceField label={t("Feature.Quick.SeriesUpdateForm.netProfit")} control={formControl} name="netProfit" />
        <PriceField label={t("Feature.Quick.SeriesUpdateForm.revenue")} control={formControl} name="revenue" />
        <PriceField label={t("Feature.Quick.SeriesUpdateForm.budget")} control={formControl} name="budget" />
      </Stack>

      <DevTool control={formControl} />
      <ConfirmationModal isOpen={isImageChangeConfirmationModalVisible} onClose={handleOnToggleImageChangeConfimationModal} onConfirm={handleOnImageUploadConfirm} title={t("Feature.Quick.SeriesUpdateForm.changeImageWarningModalTitle")} footerText={t("Feature.Quick.SeriesUpdateForm.changeImageWarningModalSuggestion")}>
        <DialogContentText mb={2}>{t("Feature.Quick.SeriesUpdateForm.changeImageWarningModalMessage")}</DialogContentText>
      </ConfirmationModal>
    </Form>
  );
});

export default SeriesUpdateForm;

const seriesStatusesList = values(MediaStatusEnum);
