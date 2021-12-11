import axios from 'axios';
import { toast } from 'react-toastify';
import { ILogin, ISignup } from '../interfaces/IAuth';
import { ISite } from '../interfaces/ISite';

const url = 'http://localhost:5000/api/v1/site';

const siteAxios = axios.create({
  baseURL: url,
  withCredentials: true
});

export const getSite = async (siteId: string) => {
  const { data } = await siteAxios.get(`/${siteId}`);
  return data.data.data;
};

export const updateSite = async (siteData: ISite, _id: string) => {
  const { data } = await siteAxios.patch(`/${_id}`, siteData);
  return data.data.data;
};
