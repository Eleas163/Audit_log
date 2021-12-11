import catchAsync from './../utils/catchAsync';
import appError from './../utils/appError';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import User from './../model/userModel';
import {
  cookieOptions,
  createAccessToken,
  decodeAccessToken
} from '../helper/jwt-helper';
import crypto from 'crypto';
import { IReqUser, IUser } from '../interfaces/IUser';

const sendToken = async (user: IUser, res: Response, message?: string) => {
  const accessToken = createAccessToken(user._id);

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', accessToken, cookieOptions);

  res.status(200).json({
    status: 'success',
    message,
    accessToken
  });
};

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // 1) Check if user entered email and password
    if (!email || !password)
      return next(new appError('Please provide email and password', 400));

    // 2) Check if email exists in database and password is correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new appError('Either email or password is wrong.', 400));

    // 3) send the token
    sendToken(user, res, 'login successfull');
  }
);

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, confirmPassword, ...rest } = req.body;
    // 1) Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist)
      return next(
        new appError(`User with email ${email} already exists. Try login`, 400)
      );

    // 2)
    const data = await User.create({
      name,
      email,
      password,
      confirmPassword,
      ...rest
    });

    sendToken(data, res, 'singup successfull');
  }
);

export const protect = catchAsync(
  async (req: IReqUser, res: Response, next: NextFunction) => {
    // 1) Getting the token and check if it's there

    const token =
      req.cookies?.jwt ||
      (req.headers?.authorization?.startsWith('Bearer') &&
        req.headers.authorization.split(' ')[1]);

    if (!token || token === '{{jwt}}' || token === 'loggedout')
      return next(new appError('You are not logged in.', 401));

    // 2) Check if token is valid
    const decoded = decodeAccessToken(token);
    // 3) check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser)
      return next(
        new appError('User belonging to this token does no longer exist', 401)
      );

    // 4) Check if use changed password after issueing the token

    if (currentUser.changedPasswordAfter(decoded.iat))
      return next(
        new appError('Password has been changed recently. Login again', 401)
      );
    req.user = currentUser;
    next();
  }
);

// export const restrictTo: any =
//   (...roles: string[]) =>
//   (req: IReqUser, res: Response, next: NextFunction) => {
//     if (!roles.includes(req.user.role))
//       return next(
//         new appError('You do not have permission to access this resource.', 401)
//       );
//     next();
//   };

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return next(
        new appError('User with this email not found. Try signup', 404)
      );

    try {
      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });

      const resetUrl = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/auth/resetpassword/${resetToken}`;

      res.status(200).json({
        status: 'success',
        message: 'Email with reset token sent!'
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpiresAt = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new appError('There was an error sending email', 400));
    }
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { resetToken } = req.params as { resetToken: string };
    const hashedResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedResetToken,
      passwordResetTokenExpiresAt: { $gte: new Date() }
    });
    if (!user)
      return next(new appError('Invalid Reset Token or has expired', 400));

    const { password, confirmPassword } = req.body as {
      password: string;
      confirmPassword: string;
    };

    user.password = password;
    user.confirmPassword = confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresAt = undefined;
    await user.save();

    sendToken(user, res);
  }
);

export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 60 * 1000),
      httpOnly: true
    });

    res.status(204).json({ status: 'success' });
  }
);

export const updateMyPassword = catchAsync(
  async (req: IReqUser, res: Response, next: NextFunction) => {
    const { currentPassword, password, confirmPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    if (!user) return next(new appError('User not found', 404));

    if (!(await user.correctPassword(currentPassword, user.password)))
      return next(new appError('Incorrect old password', 401));

    user.password = password;
    user.confirmPassword = confirmPassword;
    await user.save();

    sendToken(user, res);
  }
);
