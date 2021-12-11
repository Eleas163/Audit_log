import { CookieOptions } from 'express';
import jwt from 'jsonwebtoken';

interface Decoded {
  id: string;
  iat: number;
  exp: number;
}

export const createAccessToken = (id: string) => {
  const accessToken = jwt.sign({ id }, `${process.env.JWT_AT_SECRET}`, {
    expiresIn: process.env.JWT_AT_EXPIRY
  });

  return accessToken;
};

export const decodeAccessToken = (token: string) =>
  jwt.verify(token, `${process.env.JWT_AT_SECRET}`) as Decoded;

export const cookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: false
};
