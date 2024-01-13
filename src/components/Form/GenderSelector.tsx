import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { FormControlProps, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl, FormHelperText, SxProps } from "@mui/material";
import { GenderEnum } from "zgaya.hub-client-types/lib";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface GenderSelectorProps<T extends FieldValues> extends Omit<FormControlProps, "name"> {
  register: UseFormRegister<T>;
  name: Path<T>;
  helperText?: string;
  label?: string;
}

export default function GenderSelector<T extends FieldValues>({ register, name, helperText, label, ...restProps }: GenderSelectorProps<T>) {
  const marginRight = useThemeStyles<SxProps>((theme) => ({
    mx: theme.spacing(1),
  }));

  return (
    <FormControl {...restProps} sx={marginRight}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup {...register(name!)} name={name} sx={marginRight}>
        <FormControlLabel value={GenderEnum.MALE} control={<Radio />} label={GenderEnum.MALE} />
        <FormControlLabel value={GenderEnum.FEMALE} control={<Radio />} label={GenderEnum.FEMALE} />
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
