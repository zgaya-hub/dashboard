import React, { ReactNode } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormControl from '@mui/material/FormControl';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface FormProps {
  children: ReactNode;
  validationSchema?: yup.ObjectSchema<Record<string, yup.Schema<any>>>;
  initialValues: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
}

interface FormTextFieldProps extends StandardTextFieldProps {
  name: string;
  required?: boolean;
}

const isFormTextField = (props: StandardTextFieldProps): props is FormTextFieldProps => 'name' in props;

const Form: React.FC<FormProps> = ({ children, validationSchema, initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema || yup.object(),
    onSubmit,
  });

  const renderTextField = (child: React.ReactNode) => {
    if (React.isValidElement(child) && isFormTextField(child.props)) {
      const { name, required, ...rest } = child.props;

      const textFieldProps: FormTextFieldProps = {
        ...rest,
        id: name,
        name,
        value: formik.values[name],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        error: formik.touched[name] && Boolean(formik.errors[name]),
        helperText: formik.touched[name] && formik.errors[name] ? (formik.errors[name]) : '',
      };

      return (
        <FormControl fullWidth margin="normal" key={name}>
          <TextField {...textFieldProps} required={required} />
        </FormControl>
      );
    }

    return child;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {React.Children.map(children, renderTextField)}

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default Form;
