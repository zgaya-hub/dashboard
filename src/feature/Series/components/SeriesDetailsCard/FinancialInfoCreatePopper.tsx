import { Modal, Popover, Stack, TextField, Typography } from '@mui/material';
import { useCreateFinancialInfoForSeries } from '../../hooks';
import { Form, PriceField } from '@/components/Form';
import * as yup from "yup";
import Button from '@/components/Button';
import { FinancialInfoCreateFormFieldInterface } from '../../types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog } from '../../../../components/Dialog';

interface FinancialInfoCreatePopperProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export default function FinancialInfoCreatePopper({ anchorEl, onClose }: Readonly<FinancialInfoCreatePopperProps>) {
  const { mutateAsync, isPending: isLoading } = useCreateFinancialInfoForSeries()

  const {
    control: formControl,
    formState: { errors: formErrors },
    register: formRegister,
    setValue: setFormValue,
    handleSubmit: handleOnSubmit,
    watch: watchFormValue,
  } = useForm<FinancialInfoCreateFormFieldInterface>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      budget: 0,
      netPorfit: 0,
      revenue: 0,
    },
  });

  return (
    <Dialog
      onClose={ onClose }
      open={ !!anchorEl }
    >
      <Stack p={ 4 } gap={ 2 }>
        <Typography variant="h5" align="center">
          Sign In to Facebook
        </Typography>
        <Form rowGap={ 2 }>
          <PriceField control={formControl} name='netPorfit' label="netPorfit" error={!!formErrors.netPorfit} helperText={formErrors.netPorfit?.message} />
          <PriceField control={formControl} name='budget' label="budget" error={!!formErrors.budget} helperText={formErrors.budget?.message} />
          <PriceField control={formControl} name='revenue' label="revenue" error={!!formErrors.revenue} helperText={formErrors.revenue?.message} />
        </Form>
          <Button loading={ isLoading } variant="contained" fullWidth>
            Sign In
          </Button>
      </Stack>
    </Dialog>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.string().required("Release date is required"),
  imageId: yup.string().required("Backdrop is required"),
});