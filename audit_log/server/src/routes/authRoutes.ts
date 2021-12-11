import { Router } from 'express';
import {
  login,
  signup,
  forgotPassword,
  resetPassword,
  protect,
  logout,
  updateMyPassword
} from '../controller/authController';

const router = Router();

router.route('/updatemypassword').patch(protect, updateMyPassword);

router.route('/login').post(login);

router.route('/signup').post(signup);

router.route('/forgotpassword').post(forgotPassword);

router.route('/resetpassword/:resetToken').patch(resetPassword);

router.route('/logout').delete(logout);

export default router;
