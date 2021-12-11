import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoginForm from '../components/Login/LoginForm';
import useAuth from '../hooks/useAuth';
const LoginPage: NextPage = () => {
  const router = useRouter();
  const { currentUser, isLoading, loginFn } = useAuth();

  if (currentUser) router.replace('/');

  return (
    <>
      <LoginForm isLoading={isLoading} loginFn={loginFn} />
    </>
  );
};

export default LoginPage;
