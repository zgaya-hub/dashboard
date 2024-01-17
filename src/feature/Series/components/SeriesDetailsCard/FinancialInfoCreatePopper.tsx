import { Popover, Stack, Typography } from "@mui/material";
import { useCreateFinancialInfoForSeries } from "../../hooks";
import { Form, PriceField } from "@/components/Form";
import * as yup from "yup";
import Button from "@/components/Button";
import { FinancialInfoCreateFormFieldInterface } from "../../types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SaveIcon } from "@/components/icons";

interface FinancialInfoCreatePopperProps {
  anchorEl: HTMLElement | null;
  seriesId: string
  onClose: () => void;
  onSuccess: () => void
}

export default function FinancialInfoCreatePopper({ anchorEl, onClose, seriesId, onSuccess }: Readonly<FinancialInfoCreatePopperProps>) {
  const { mutateAsync, isPending: isLoading } = useCreateFinancialInfoForSeries();

  const {
    control: formControl,
    formState: { errors: formErrors },
    handleSubmit: submitForm,
  } = useForm<FinancialInfoCreateFormFieldInterface>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      budget: 0,
      netProfit: 0,
      revenue: 0,
    },
  });

  const handleOnSubmit = async (input: FinancialInfoCreateFormFieldInterface) => {
    await mutateAsync(
      {
        SeriesId: seriesId,
      },
      {
        Budget: input.budget,
        NetProfit: input.netProfit,
        Revenue: input.revenue,
      }
    );
    onSuccess()
  };

  return (
    <Popover onClose={onClose} open={!!anchorEl} anchorEl={anchorEl}>
      <Stack p={4} gap={2}>
        <Typography variant="h5">Financial info</Typography>
        <Form rowGap={2} onSubmit={submitForm(handleOnSubmit)}>
          <PriceField control={formControl} name="netProfit" label="netProfit" error={!!formErrors.netProfit} helperText={formErrors.netProfit?.message} />
          <PriceField control={formControl} name="budget" label="budget" error={!!formErrors.budget} helperText={formErrors.budget?.message} />
          <PriceField control={formControl} name="revenue" label="revenue" error={!!formErrors.revenue} helperText={formErrors.revenue?.message} />
        </Form>
        <Button loading={isLoading} variant="contained" fullWidth endIcon={<SaveIcon />} onClick={submitForm(handleOnSubmit)}>
          Save
        </Button>
      </Stack>
    </Popover>
  );
}

const validationSchema = yup.object().shape({
  netProfit: yup.number().required("Net profit is required"),
  budget: yup.number().required("Budget is required"),
  revenue: yup.number().required("Revenue is required"),
});
