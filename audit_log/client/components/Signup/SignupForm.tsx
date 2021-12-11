import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputBox from '../InputBox';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/dist/client/router';
import { minLength } from '../../helper/formRules';
import validator from 'validator';
import { ISignup } from '../../interfaces/IAuth';
import { toast } from 'react-toastify';

interface IErrorMessage {
  email?: string;
  password?: string;
  nickname?: string;
  confirmPassword?: string;
}

interface IProps {
  isLoading: boolean;
  signupFn: (data: ISignup) => void;
}

const SignupForm: React.FC<IProps> = ({ isLoading, signupFn }) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignup>();

  const submitHandler: SubmitHandler<ISignup> = async formData => {
    if (formData.password !== formData.confirmPassword)
      return toast.error('Password Does not match');
    signupFn(formData);
  };

  let errorMessage: IErrorMessage = { email: undefined, password: undefined };

  if (errors.email) {
    errorMessage.email = errors.email.message || 'Invalid email address';
  }
  if (errors.password) {
    errorMessage.password = errors.password.message;
  }
  if (errors.confirmPassword)
    errorMessage.confirmPassword = errors.confirmPassword.message;

  if (errors.nickname) errorMessage.nickname = errors.nickname.message;

  return (
    <>
      <Container maxWidth="sm" className="">
        <Box className="text-center mt-16">
          <Typography className="font-bold p-4" variant="h5" component="h1">
            Sign Up
          </Typography>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col py-2"
          >
            <InputBox
              control={control}
              name="nickname"
              type="text"
              label="Nickname"
              rules={{ isRequired: true }}
              isError={!!errors?.nickname}
              errorMessage={errorMessage.nickname}
            />
            <InputBox
              control={control}
              type="email"
              label="Email"
              rules={{ isRequired: true, isValid: validator.isEmail }}
              isError={!!errors?.email}
              errorMessage={errorMessage.email}
            />
            <InputBox
              control={control}
              type="password"
              label="Password"
              rules={{ isRequired: true, minLength: minLength(8) }}
              isError={!!errors?.password}
              errorMessage={errorMessage.password}
            />
            <InputBox
              control={control}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              rules={{ isRequired: true, minLength: minLength(8) }}
              isError={!!errors?.confirmPassword}
              errorMessage={errorMessage.confirmPassword}
            />
            <LoadingButton
              loading={isLoading}
              type="submit"
              className="my-2"
              variant="contained"
            >
              Submit
            </LoadingButton>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default SignupForm;
