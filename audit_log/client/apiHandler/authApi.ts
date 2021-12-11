import axios from 'axios';
import { ILogin, ISignup } from '../interfaces/IAuth';
import { IUser } from '../interfaces/IUser';

const url = 'http://localhost:5000/api/v1/auth';
const userUrl = 'http://localhost:5000/api/v1/users';

const authAxios = axios.create({
  baseURL: url,
  withCredentials: true
});

const userAxios = axios.create({
  baseURL: userUrl,
  withCredentials: true
});

export const loginRequest = async (credentials: ILogin) => {
  const { data } = await authAxios.post('/login', credentials);
  return data;
};

export const signupRequest = async (credentials: ISignup) => {
  const { data } = await authAxios.post('/signup', credentials);
  return data;
};

export const logoutRequest = async () => {
  const { data } = await authAxios.delete('/logout');
  window.localStorage.removeItem('user');
  return data;
};

export const getMeRequest = async () => {
  const localStorageUser = window.localStorage.getItem('user');

  if (localStorageUser) return JSON.parse(localStorageUser);
  else {
    const { data } = await userAxios.get(userUrl + '/getme');
    const user = data.data.data;
    window.localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
};
