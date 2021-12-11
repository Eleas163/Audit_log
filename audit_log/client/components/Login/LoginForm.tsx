import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputBox from '../InputBox';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import { minLength } from '../../helper/formRules';
import validator from 'validator';
import { ILogin } from '../../interfaces/IAuth';
import { useRouter } from 'next/router';

interface IValidationErrorMessage {
  email?: string;
  password?: string;
}
interface IProps {
  isLoading: boolean;
  loginFn: (c: ILogin) => void;
}

const LoginForm: React.FC<IProps> = ({ isLoading, loginFn }) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ILogin>();

  const submitHandler: SubmitHandler<ILogin> = async formData =>
    loginFn(formData);

  let errorMessage: IValidationErrorMessage = {
    email: undefined,
    password: undefined
  };

  if (errors.email) {
    errorMessage.email = errors.email.message || 'Invalid email address';
  }
  if (errors.password) {
    errorMessage.password = errors.password.message;
  }

  return (
    <>
      <Container maxWidth="sm" className="">
        <Box className="text-center mt-24">
          <Typography className="font-bold p-4" variant="h5" component="h1">
            Sign In
          </Typography>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col py-2"
          >
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

export default LoginForm;
