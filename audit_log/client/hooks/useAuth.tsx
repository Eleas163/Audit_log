import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IUser } from '../interfaces/IUser';
import {
  getMeRequest,
  loginRequest,
  logoutRequest,
  signupRequest
} from '../apiHandler/authApi';
import { ILogin, ISignup } from '../interfaces/IAuth';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const useAuth = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { isLoading: isGettingUser, data: currentUser } = useQuery(
    'user-info',
    getMeRequest,
    {
      retry: false
    }
  );

  const { isLoading: isLoggingIn, mutate: loginMutate } = useMutation<
    any,
    any,
    any,
    any
  >((data: ILogin) => loginRequest(data));

  const { isLoading: isSigningIn, mutate: signingMutate } = useMutation<
    any,
    any,
    any,
    any
  >((data: ISignup) => signupRequest(data));
  const { isLoading: isLoggingOut, mutate: logoutMutate } = useMutation<
    any,
    any,
    any,
    any
  >(() => logoutRequest());

  const mutateOptions = {
    onSuccess: (data: any) => {
      toast.success(data.message.toUpperCase());
      queryClient.invalidateQueries('user');
      router.replace('/');
    },
    onError: (error: any) => {
      const errorMessage: string =
        error?.response.data.message || error.message || 'Something went wrong';
      toast.error(errorMessage.toUpperCase());
    }
  };

  const loginFn = (credentials: ILogin) =>
    loginMutate(credentials, mutateOptions);

  const signupFn = (credentials: ISignup) =>
    signingMutate(credentials, mutateOptions);

  const logoutFn = () => {
    logoutMutate('', {
      onSuccess: () => {
        queryClient.removeQueries('user-info', { exact: true });
        router.replace('/');
      },
      onError: mutateOptions.onError
    });
  };

  const isLoading = isLoggingIn || isSigningIn || isLoggingOut || isGettingUser;
  return {
    isLoading,
    currentUser,
    loginFn,
    signupFn,
    logoutFn
  };
};

export default useAuth;
