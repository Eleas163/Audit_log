import type { NextPage } from 'next';
import SignupForm from '../components/Signup/SignupForm';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';

const SignupPage: NextPage = () => {
  const router = useRouter();
  const { currentUser, isLoading, signupFn } = useAuth();
  if (currentUser) router.replace('/');
  return <SignupForm isLoading={isLoading} signupFn={signupFn} />;
};

export default SignupPage;
