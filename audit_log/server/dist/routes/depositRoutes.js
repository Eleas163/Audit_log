"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const depositController_1 = require("../controller/depositController");
const router = (0, express_1.Router)();
router.route('/').get(depositController_1.getAllDeposit).post(depositController_1.createDeposit);
router.route('/:id').get(depositController_1.getDeposit).patch(depositController_1.updateDeposit).delete(depositController_1.deleteDeposit);
exports.default = router;
