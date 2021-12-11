import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} from './handlerFactory';
import User from '../model/userModel';
import catchAsync from '../utils/catchAsync';
import { IReqUser } from '../interfaces/IUser';
import { NextFunction, Response } from 'express';

export const getAllUser = getAll(User);

export const getUser = getOne(User);

export const createUser = createOne(User);

export const updateUser = updateOne(User);

export const deleteUser = deleteOne(User);

export const getMe = catchAsync(
  async (req: IReqUser, res: Response, next: NextFunction) => {
    res.status(200).json({ status: 'success', data: { data: req.user } });
  }
);

export const updateMe = catchAsync(
  async (req: IReqUser, res: Response, next: NextFunction) => {
    const allowedFields = ['email', 'nickname'];
    let infoToUpdate: any = {};
    allowedFields.forEach(field => {
      if (req.body[field]) {
        infoToUpdate[field] = req.body[field];
      }
    });

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      infoToUpdate,
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: 'success', data: { data: updatedUser } });
  }
);
