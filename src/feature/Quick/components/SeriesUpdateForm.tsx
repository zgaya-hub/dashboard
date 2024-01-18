import { DatePickerModal, FileSelectInput, ModalSelectInput, PriceField, SelectInput, TextField } from "@/components/Form";
import { DevTool } from "@hookform/devtools";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SeriesUpdateFormFieldInterface } from "../types";
import { CountryPickerModal, GenrePickerModal, LanguagePickerModal } from "@/components/Modals";
import { useEffect, useState } from "react";
import { ImageVariantEnum, MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";
import { values } from "lodash";
import { Backdrop, CardMedia, CircularProgress, MenuItem, SxProps, Typography } from "@mui/material";
import { useCreateImage, useGetSeriesDetailsById } from "../hooks";
import { extractImageBase64, extractImageMetadata, extractImageUrl } from "metalyzer";

export interface SeriesUpdateFormProps {
  seriesId: string;
}

export default function SeriesUpdateForm({ seriesId }: SeriesUpdateFormProps) {
  const { t } = useTranslation();
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [isGenreModalVisible, setIsGenreModalVisible] = useState(false);
  const [backdropImageUrl, setBackdropImageUrl] = useState("");
  const { data: seriesDetailsData, isLoading: isSeriesDetailsLoading } = useGetSeriesDetailsById({ SeriesId: seriesId });
  const { mutateAsync: createImageMutateAsync, isPending: isCreateImageLoading } = useCreateImage();

  const {
    control: formControl,
    register: formRegister,
    formState: { errors: formErrors },
    setValue: setFormValue,
    watch: watchFormValue,
  } = useForm<SeriesUpdateFormFieldInterface>({
    defaultValues: {
      budget: seriesDetailsData?.budget,
      netProfit: seriesDetailsData?.netProfit,
      revenue: seriesDetailsData?.revenue,
    },
  });

  useEffect(() => {
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
  }, [seriesDetailsData]);

  console.log({ title: watchFormValue("title") }, { plotSummary: watchFormValue("plotSummary") }, { releaseDate: watchFormValue("releaseDate") }, { imageId: watchFormValue("imageId") }, { originCountry: watchFormValue("originCountry") }, { genre: watchFormValue("genre") }, { originalLanguage: watchFormValue("originalLanguage") }, { netProfit: watchFormValue("netProfit") }, { status: watchFormValue("status") }, { budget: watchFormValue("budget") }, { revenue: watchFormValue("revenue") });

  const handleOnImageSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    setBackdropImageUrl(await extractImageUrl(image));
    const result = await createImageMutateAsync({ Base64: imageBase64, Mime: mimeType, Variant: ImageVariantEnum.BACKDROP });
    if (result) {
      setFormValue("imageId", result.ID);
    }
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

  console.log(watchFormValue('status'));
  
  return (
    <Stack padding={4} gap={2}>
      <Backdrop open={isSeriesDetailsLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <TextField register={formRegister} name="title" label={t("Feature.Quick.SeriesUpdateForm.title")} helperText={formErrors.title?.message} error={!!formErrors.title} fullWidth autoFocus />
      <DatePickerModal label={t("Feature.Quick.SeriesUpdateForm.releaseDate")} views={["year", "month"]} fullWidth register={formRegister} name={"releaseDate"} />
      <Stack sx={fileSelectInputContainerStyle}>
        <FileSelectInput loading={isCreateImageLoading} label={t("Feature.Quick.SeriesUpdateForm.selectBackdropImage")} fullWidth onFileSelect={handleOnImageSelect} helperText={formErrors.imageId?.message} error={!!formErrors.imageId} />
        <CardMedia component="img" className="appear-item" image={backdropImageUrl} />
      </Stack>
      <TextField register={formRegister} name="plotSummary" label={t("Feature.Quick.SeriesUpdateForm.plotSummary")} helperText={formErrors.plotSummary?.message} error={!!formErrors.plotSummary} multiline rows={5} fullWidth />
      <Stack gap={2} py={1}>
        <Typography variant="h5">{t("Feature.Quick.SeriesUpdateForm.additionalInfo")}</Typography>
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
      <Stack gap={2}>
        <Typography variant="h5">{t("Feature.Quick.SeriesUpdateForm.financialInfo")}</Typography>
        <PriceField label={t("Feature.Quick.SeriesUpdateForm.netProfit")} control={formControl} name="netProfit" />
        <PriceField label={t("Feature.Quick.SeriesUpdateForm.revenue")} control={formControl} name="revenue" />
        <PriceField label={t("Feature.Quick.SeriesUpdateForm.budget")} control={formControl} name="budget" />
      </Stack>
      <DevTool control={formControl} />
    </Stack>
  );
}

const seriesStatusesList = values(MediaStatusEnum);
