import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ISite } from '../interfaces/ISite';
import { getSite, updateSite } from '../apiHandler/siteApi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const useAuth = () => {
  const queryClient = useQueryClient();

  const mutateOptions = {
    onSuccess: (data: any) => {
      toast.success('Data updated');
      queryClient.invalidateQueries('site-info');
    },
    onError: (error: any) => {
      const errorMessage: string =
        error?.response.data.message || error.message || 'Something went wrong';
      toast.error(errorMessage.toUpperCase());
    }
  };
  const siteId = '61b27509666e346a4dcfd480';
  const { isLoading: isGettingSite, data: siteInfo } = useQuery(
    ['site-info', siteId],
    () => getSite(siteId),
    {
      retry: false,
      onError: mutateOptions.onError
    }
  );

  const { isLoading: isUpdatingSite, mutate: siteMutate } = useMutation<
    any,
    any,
    any,
    any
  >((data: ISite) => updateSite(data, siteId));

  const updateSiteFn = (siteData: ISite) => {
    siteMutate(siteData, mutateOptions);
  };

  const isLoading = isGettingSite || isUpdatingSite;

  return {
    isLoading,
    siteInfo,
    updateSiteFn
  };
};

export default useAuth;
