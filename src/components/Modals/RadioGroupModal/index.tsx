import { Dialog } from "@/components/Dialog";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { ChangeEvent, ReactNode, useRef, useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { SxProps } from "@mui/material";

interface RadioGroupModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children?: ReactNode;
  cancelButtonText?: string;
  disabledConfirmButton?: boolean;
  disabledCancelButton?: boolean;
  confirmButtonText?: string;
  variant?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

export default function RadioGroupModal({ isOpen, onClose, cancelButtonText, confirmButtonText, children, title, disabledCancelButton, disabledConfirmButton, variant = "primary" }: RadioGroupModalProps) {
  const { t } = useTranslation();
  const radioGroupRef = useRef<HTMLElement>(null);
  const [value, setValue] = useState("");

  const handleOnConfirm = () => {
    onClose();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const dialogBoxStyle = useThemeStyles<SxProps>((theme) => ({
    // maxHeight: theme.spacing(64),
    "& .MuiDialog-paper": {
        width:  theme.spacing(48),
        maxHeight: theme.spacing(64),
    },
  }));

  const dialogActions = (
    <>
      <Button onClick={onClose} variant="text" color={variant} disabled={disabledCancelButton} size="small">
        {cancelButtonText ?? t("Component.Modals.RadioGroupModal.cancel")}
      </Button>
      <Button onClick={handleOnConfirm} variant="contained" color={variant} disabled={disabledConfirmButton} size="small">
        {confirmButtonText ?? t("Component.Modals.RadioGroupModal.ok")}
      </Button>
    </>
  );

  return (
    <Dialog open={isOpen} onClose={onClose} headerText={title} hideCrossButton dialogAction={dialogActions} sx={dialogBoxStyle}>
      <RadioGroup ref={radioGroupRef} aria-label="ringtone" name="ringtone" value={value} onChange={handleChange}>
        {options.map((option) => (
          <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </Dialog>
  );
}

const options = ["None", "Atria", "Callisto", "Dione", "Ganymede", "Hangouts Call", "Luna", "Oberon", "Phobos", "Pyxis", "Sedna", "Titania", "Triton", "Umbriel"];
