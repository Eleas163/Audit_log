import { Router } from 'express';
import { protect } from '../controller/authController';
import {
  getAllSite,
  createSite,
  getSite,
  updateSite,
  deleteSite,
  createdAuditLog,
  updatedAuditLog
} from '../controller/siteContorller';

const router = Router();

router.use(protect);

router.route('/').get(getAllSite).post(createdAuditLog, createSite);
router.route('/:id').get(getSite).patch(updatedAuditLog,updateSite).delete(deleteSite);

export default router;
