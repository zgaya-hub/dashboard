import { Stack, Typography } from "@mui/material";
import CineastCreateForm from "../components/CineastCreateForm";
import { CineastCreateFormFieldInterface } from "../types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Elevator } from "@/components/Tags";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { SaveIcon } from "@/components/icons";
import { useCreateImage, useCreateCineast } from "../hooks";
import { extractImageBase64, extractImageMetadata } from "metalyzer";
import { ImageVariantEnum } from "@/types/enum";

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

  const pageHeader = (
    <Elevator p={2} justifyContent={"space-between"} direction={"row"} gap={1} alignItems={"center"}>
      <Typography variant="h5">{t("Feature.Quick.CineastCreateScreen.createACineast")}</Typography>
      <Stack direction={"row"} gap={1}>
        <Button variant="text" onClick={() => window.close()}>
          {t("Feature.Quick.CineastCreateScreen.back")}
        </Button>
        <Button loading={isCreateCineastLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleOnSubmit(handleOnCreateEpisode)}>
          {t("Feature.Quick.CineastCreateScreen.save")}
        </Button>
      </Stack>
    </Elevator>
  );

  return (
    <Stack>
      {pageHeader}
      <CineastCreateForm formControl={formControl} formErrors={formErrors} formRegister={formRegister} onImageSelect={handleOnImageSelect} isLoading={isCreateImageLoading} setFormValue={setFormValue} watchFormValue={watchFormValue} />
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  // imageId: yup.string().required("Profile picture is required"),
  bio: yup.string().required("Bio is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  country: yup.string().required("Country is required"),
  fullName: yup.string().required("Full Name is required"),
  gender: yup.string().required("Gender is required"),
  profession: yup.string().required("Profession is required"),
});
