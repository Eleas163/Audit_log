import { Request } from 'express';
import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  nickname: string;
  email: string;
  password: string;
  confirmPassword?: string;

  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpiresAt?: Date;
  correctPassword: (
    enteredPassword: string,
    hashedPassword: string
  ) => Promise<boolean>;
  changedPasswordAfter: (jwtTimeStamp: number) => boolean;
  createPasswordResetToken: () => string;
}

export interface IReqUser extends Request {
  user: IUser;
}
