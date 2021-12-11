import { Router } from 'express';
import { protect } from '../controller/authController';
import {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe
} from '../controller/userController';

const router = Router();

router.use(protect);

router.route('/getme').get(getMe);
router.route('/updateme').patch(updateMe);

router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
