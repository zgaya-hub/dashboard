import { useState } from "react";
import { useForm } from "react-hook-form";
import { GetSeriesDetailsByIdOutput, MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";
import { DatePickerModal, ModalSelectInput, PriceField, SelectInput, TextField as TextFieldInput } from "@/components/Form";
import { CountryPickerModal, GenrePickerModal, LanguagePickerModal } from "@/components/Modals";
import { ListItemText, MenuItem } from "@mui/material";
import { values } from "lodash";

export default function useCardFieldsForEdit() {
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [isGenreModalVisible, setIsGenreModalVisible] = useState(false);

  const { register: formRegister, reset, formState, watch: watchFormValue, setValue: setFormValue } = useForm<GetSeriesDetailsByIdOutput>();

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

  function CountryChanger({defaultValue, label}: CountryChangerProps) {
    return (
      <>
        <ModalSelectInput isModalVisible={isCountryModalVisible} label={label} value={watchFormValue("originCountry") ?? defaultValue} onClick={handleOnToggleCountryModal} fullWidth />
        <CountryPickerModal isOpen={isCountryModalVisible} onClose={handleOnToggleCountryModal} onOk={handleOnSelectCountry} />
      </>
    );
  }

  function LanguageChanger({defaultValue, label}: LanguageChangerProps) {
    return (
      <>
        <ModalSelectInput isModalVisible={isLanguageModalVisible} label={label} value={watchFormValue("originalLanguage") ?? defaultValue} onClick={handleOnToggleLanguageModal} fullWidth />
        <LanguagePickerModal isOpen={isLanguageModalVisible} onClose={handleOnToggleLanguageModal} onOk={handleOnSelectLanguage} />
      </>
    );
  }

  function GenreChanger({defaultValue, label}: GenreChangerProps) {
    return (
      <>
        <ModalSelectInput isModalVisible={isGenreModalVisible} label={label} value={watchFormValue("genre") ?? defaultValue} onClick={handleOnToggleGenreModal} fullWidth />
        <GenrePickerModal isOpen={isGenreModalVisible} onClose={handleOnToggleGenreModal} onOk={handleOnSelectGenre} />
      </>
    );
  }

  function StatusChanger({defaultValue, label}: StatusChangerProps) {
    return (
      <SelectInput label={label} fullWidth name="status" defaultValue={defaultValue} register={formRegister}>
        {seriesStatusesList.map((movieStatus) => {
          return (
            <MenuItem value={movieStatus}>
              <ListItemText>{movieStatus}</ListItemText>
            </MenuItem>
          );
        })}
      </SelectInput>
    );
  }

  function TextField({ name, label, defaultValue }: TextFieldProps) {
    return <TextFieldInput label={label} register={formRegister} name={name} defaultValue={defaultValue} />;
  }

  function DateChanger({ name, label, defaultValue }: DateChangerProps) {
    return <DatePickerModal label={label} name={name} register={formRegister} defaultValue={defaultValue} />;
  }

  function PriceChanger({ name, label, defaultValue }: PriceFieldProps) {
    return <PriceField label={label} name={name} register={formRegister} defaultValue={defaultValue} />;
  }

  return { StatusChanger, GenreChanger, LanguageChanger, CountryChanger, reset, isDirty: formState.isDirty, TextField, DateChanger, PriceChanger };
}

const seriesStatusesList = values(MediaStatusEnum);

interface TextFieldProps {
  name: keyof GetSeriesDetailsByIdOutput;
  label: string;
  defaultValue: string
}

interface DateChangerProps {
  name: keyof GetSeriesDetailsByIdOutput;
  label: string;
  defaultValue: number
}

interface PriceFieldProps {
  name: keyof GetSeriesDetailsByIdOutput;
  label: string;
  defaultValue: number
}

interface CountryChangerProps {
  label: string;
  defaultValue: MediaCountriesEnum
}
interface LanguageChangerProps {
  label: string;
  defaultValue: MediaLanguagiesEnum
}
interface GenreChangerProps {
  label: string;
  defaultValue: MediaGenriesEnum
}
interface StatusChangerProps {
  label: string;
  defaultValue: MediaStatusEnum
}
