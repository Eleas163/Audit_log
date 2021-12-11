import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

interface rules {
  isRequired?: boolean;
  minLength?: any;
  isValid?: (s: string) => boolean;
}

interface IProps {
  name?: string;
  type: string;
  label: string;
  control: any;
  rules?: rules;
  errorMessage?: string;
  isError: boolean;
  customStyle?: any;
  size?: string;
  multiline?: boolean;
  rows?: number;
}

const InputBox: React.FC<IProps> = props => {
  const {
    type,
    label,
    control,
    rules,
    isError,
    errorMessage,
    name,
    customStyle,
    multiline,
    rows
  } = props;
  return (
    <>
      <Controller
        name={name || label.toLowerCase()}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            sx={customStyle}
            multiline={multiline}
            rows={rows}
            error={isError}
            className="my-2"
            type={type}
            label={label}
            helperText={errorMessage}
          />
        )}
        rules={{
          required: {
            value: !!rules?.isRequired,
            message: `${label} is required`
          },
          minLength: rules?.minLength,
          validate: {
            isValid: v => (rules?.isValid ? rules?.isValid(v) : true)
          }
        }}
      />
    </>
  );
};

export default InputBox;
