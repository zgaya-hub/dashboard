import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Typography, Paper } from "@mui/material";
import { extractImageBase64, extractImageMetadata } from "metalyzer";
import * as yup from "yup";
import { ImageVariantEnum } from "zgaya.hub-client-types/lib";

import Button from "@/components/Button";
import { SaveIcon } from "@/components/icons";

import CineastCreateForm from "../components/CineastCreateForm";
import { useCreateCineast, useCreateImage } from "../hooks";
import { CineastCreateFormFieldInterface } from "../types";

export default function CineastCreateScreen() {
  const { t } = useTranslation();
  const { mutateAsync: createCineastMutateAsync, isPending: isCreateCineastLoading } = useCreateCineast();
  const { mutateAsync: createImageMutateAsync, isPending: isCreateImageLoading } = useCreateImage();

  const {
    control: formControl,
    formState: { errors: formErrors },
    register: formRegister,
    handleSubmit: handleOnSubmit,
    setValue: setFormValue,
    watch: watchFormValue,
  } = useForm<CineastCreateFormFieldInterface>({
    resolver: yupResolver(validationSchema),
  });

  const handleOnImageSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    const result = await createImageMutateAsync({ Base64: imageBase64, Mime: mimeType, Variant: ImageVariantEnum.BACKDROP });
    if (result) {
      setFormValue("imageId", result.ID);
    }
  };

  const handleOnCreateEpisode = async (input: CineastCreateFormFieldInterface) => {
    await createCineastMutateAsync({
      ImageId: input.imageId,
      Award: input.award,
      Bio: input.bio,
      DateOfBirth: input.dateOfBirth,
      Country: input.country,
      FullName: input.fullName,
      Gender: input.gender,
      Profession: input.profession,
    });
    window.close();
  };

  return (
    <Stack>
      <Stack component={ Paper } p={ 2 } justifyContent={ "space-between" } direction={ "row" } gap={ 1 } alignItems={ "center" }>
        <Typography variant="h5">{ t("Feature.Quick.CineastCreateScreen.createACineast") }</Typography>
        <Stack direction={ "row" } gap={ 1 }>
          <Button variant="text" onClick={ () => window.close() }>
            { t("Feature.Quick.CineastCreateScreen.back") }
          </Button>
          <Button loading={ isCreateCineastLoading } endIcon={ <SaveIcon /> } variant="contained" onClick={ handleOnSubmit(handleOnCreateEpisode) }>
            { t("Feature.Quick.CineastCreateScreen.save") }
          </Button>
        </Stack>
      </Stack>
      <CineastCreateForm formControl={ formControl } formErrors={ formErrors } formRegister={ formRegister } onImageSelect={ handleOnImageSelect } isLoading={ isCreateImageLoading } setFormValue={ setFormValue } watchFormValue={ watchFormValue } />
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  imageId: yup.string().required("Profile picture is required"),
  bio: yup.string().required("Bio is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  country: yup.string().required("Country is required"),
  fullName: yup.string().required("Full Name is required"),
  gender: yup.string().required("Gender is required"),
  profession: yup.string().required("Profession is required"),
});
