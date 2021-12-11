import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} from './handlerFactory';
import Site from '../model/siteModel';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import { IReqUser } from '../interfaces/IUser';
import { ISite } from '../interfaces/ISite';

export const getAllSite = getAll(Site);

export const getSite = getOne(Site);

export const createSite = createOne(Site);

export const updateSite = updateOne(Site);

export const deleteSite = deleteOne(Site);

export const createdAuditLog = catchAsync(
  async (req: IReqUser, res: Response, next: NextFunction) => {
    (req.body as ISite).auditLog = [
      {
        nickname: req.user.nickname,
        operation: 'Created',
        date: new Date()
      }
    ];
    next();
  }
);
export const updatedAuditLog = catchAsync(
  async (req: IReqUser, res: Response, next: NextFunction) => {
    const siteToUpdate = await Site.findById(req.params.id);
    if (siteToUpdate)
      req.body.auditLog = [
        ...siteToUpdate.auditLog,
        {
          nickname: req.user.nickname,
          operation: 'Updated',
          date: new Date()
        }
      ];
    next();
  }
);
